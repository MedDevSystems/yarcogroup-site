#!/usr/bin/env python3
# Seed PocketBase (yarko CMS): collections site/pages + current content. Idempotent.
import json, sys, urllib.request, urllib.error

BASE = "http://127.0.0.1:8090"
EMAIL, PASSWORD = sys.argv[1], sys.argv[2]

def req(method, path, token=None, body=None):
    data = json.dumps(body).encode("utf-8") if body is not None else None
    r = urllib.request.Request(BASE + path, data=data, method=method)
    r.add_header("Content-Type", "application/json")
    if token:
        r.add_header("Authorization", token)
    try:
        with urllib.request.urlopen(r) as resp:
            return resp.status, json.loads(resp.read().decode("utf-8") or "{}")
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read().decode("utf-8") or "{}")

# 1) auth superuser
st, res = req("POST", "/api/collections/_superusers/auth-with-password",
              body={"identity": EMAIL, "password": PASSWORD})
assert st == 200, f"auth failed {st}: {res}"
tok = res["token"]
print("auth ok")

def ensure_collection(name, fields):
    st, _ = req("GET", f"/api/collections/{name}", tok)
    if st == 200:
        print(f"collection {name}: exists")
        return
    payload = {"name": name, "type": "base", "listRule": "", "viewRule": "",
               "createRule": None, "updateRule": None, "deleteRule": None, "fields": fields}
    st, res = req("POST", "/api/collections", tok, payload)
    print(f"collection {name}: create -> {st} {res if st>=400 else 'ok'}")

def txt(name, **kw):
    return {"name": name, "type": "text", **kw}

ensure_collection("site", [
    txt("email"), txt("phone"), txt("phoneHref"), txt("address"),
    txt("privacyPath"), txt("reqLegalName"), txt("reqInn"), txt("reqOgrn"),
])
ensure_collection("pages", [
    txt("key", required=True), txt("eyebrow"), txt("titleLead"),
    txt("titleAccent"), txt("lead"),
])

def upsert(coll, filt, body):
    # find existing
    import urllib.parse
    q = urllib.parse.quote(filt)
    st, res = req("GET", f"/api/collections/{coll}/records?filter={q}&perPage=1", tok)
    items = res.get("items", []) if st == 200 else []
    if items:
        rid = items[0]["id"]
        st, res = req("PATCH", f"/api/collections/{coll}/records/{rid}", tok, body)
        print(f"{coll} update {body.get('key','(site)')}: {st}")
    else:
        st, res = req("POST", f"/api/collections/{coll}/records", tok, body)
        print(f"{coll} create {body.get('key','(site)')}: {st} {res if st>=400 else ''}")

# 2) site (single record)
upsert("site", 'email != ""', {
    "email": "info@yarcogroup.ru", "phone": "+7 (495) 000-00-00",
    "phoneHref": "tel:+74950000000", "address": "Москва, Россия",
    "privacyPath": "/privacy", "reqLegalName": "ООО «ЯРКО ГРУПП»",
    "reqInn": "ИНН 0000000000", "reqOgrn": "ОГРН 0000000000000",
})

# 3) pages
PAGES = [
    ("hero", "ВСЕ НЕОБХОДИМОЕ", "Надёжные поставки", "для медицины",
     "Медицинские расходные материалы и средства гигиены для клиник, лабораторий и стационаров. Сертифицированная продукция, контроль качества и доставка по всей России и СНГ."),
    ("about", "02 / О КОМПАНИИ", "Надёжный партнёр", "медицинских организаций",
     "YARCO GROUP — поставщик медицинских расходных материалов и средств гигиены для медицинских организаций: клиник, лабораторий, стационаров и амбулаторий."),
    ("mission", "02 / НАША МИССИЯ", "Всё необходимое", "для медицины",
     "Мы обеспечиваем медицинские организации расходными материалами — стабильно, в срок и с контролем качества, чтобы врачи могли сосредоточиться на пациентах."),
    ("directions", "02 / НАПРАВЛЕНИЯ БИЗНЕСА", "Что мы", "поставляем",
     "Несколько направлений снабжения медицинских организаций, объединённых единой системой поставок и контроля качества."),
    ("partners", "04 / ПАРТНЁРАМ", "Растём", "вместе",
     "Мы открыты к сотрудничеству — для инвесторов и для производителей медицинской продукции. Выберите подходящий формат."),
    ("investments", "04 / ИНВЕСТИЦИИ", "Инвестиционные", "возможности",
     "Мы развиваем инфраструктуру снабжения медучреждений и приглашаем партнёров к участию в росте компании."),
    ("suppliers", "04 / ПОСТАВЩИКАМ", "Станьте нашим", "поставщиком",
     "Мы заинтересованы в надёжных производителях медицинских расходных материалов и средств гигиены."),
    ("blog", "05 / БЛОГ", "Новости и", "материалы",
     "Здесь будут публикации компании: новости, обзоры медицинской продукции и полезные материалы для медучреждений."),
    ("privacy", "ПРАВОВАЯ ИНФОРМАЦИЯ", "Политика", "конфиденциальности",
     "Настоящая политика описывает порядок обработки персональных данных на сайте yarcogroup.ru."),
    ("contacts", "06 / КОНТАКТЫ", "Свяжитесь", "с нами",
     "Ответим на вопросы о продукции, поставках и сотрудничестве."),
]
for key, eyebrow, lead_, accent, lead in PAGES:
    upsert("pages", f'key = "{key}"', {
        "key": key, "eyebrow": eyebrow, "titleLead": lead_,
        "titleAccent": accent, "lead": lead,
    })

print("SEED DONE")
