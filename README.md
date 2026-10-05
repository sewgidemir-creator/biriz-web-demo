# Bir İZ Derneği — Web Sitesi Demosu (birizdernegi.org yenileme)

Bu klasör, **Birey ve Toplum Ruh Sağlığında İZ Derneği** web sitesinin yenilenmesi için hazırlanmış,
tamamen statik (HTML + CSS + az miktarda JavaScript) bir **tasarım demosudur**. Sayfa oluşturucu
(page builder) veya veritabanı kullanılmaz; herhangi bir web sunucusunda ya da doğrudan bilgisayarınızda açılabilir.

> Sayfalarda **[taslak]** etiketiyle işaretli içerikler (misyon/vizyon seçenekleri, rakamlar, IBAN’lar,
> görev unvanları vb.) Yönetim Kurulu / İletişim Komitesi onayı beklemektedir.

## Klasör yapısı

```
biriz-demo/
├── index.html              Ana Sayfa (hero, tanıtım, rakamlar, projeler, alanlar, partnerler, haberler, üçlü CTA)
├── hakkimizda.html         Kim olduğumuz + Misyon/Vizyon (Taslak A / B) + Değerler + Tarihçe
├── yonetim.html            Yönetim Kurulu (5 üye)
├── ekibimiz.html           Proje ekibi + Yürütme Kurulu + gönüllü/danışman yer tutucuları
├── calisma-alanlari.html   6 çalışma alanı (yöntem, hedef kitle, örnek projeler)
├── projeler.html           Tema ve durum filtreli proje kartları (23 proje)
├── isbirlikleri.html       Kamu / Uluslararası / Akademik / Özel Sektör / STK
├── haberler.html           Yıllara göre haber arşivi
├── kaynaklar.html          Kurumsal belgeler, mali tablolar, bağışçı hakları, rehber, KVKK
├── iletisim.html           İletişim bilgileri + ön yüz iletişim formu (sunucuya veri göndermez)
├── bagis.html              Etki anlatısı + bireysel / kurumsal / gönüllü destek + IBAN yer tutucuları
├── css/styles.css          Tüm sayfaların ortak stil dosyası
├── js/main.js              Mobil menü, proje filtresi, form doğrulama, sayaç, IBAN kopyalama
├── _kaynak/                (İsteğe bağlı) Sayfaları üreten Python betikleri ve içerik verisi
│   ├── build.py            → python3 _kaynak/build.py  ile tüm .html dosyalarını yeniden üretir
│   ├── common.py           header, footer, menü, ikonlar
│   ├── data.py             projeler, haberler, iş birlikleri, kişiler (tek yerden düzenleme)
│   ├── pages1.py / pages2.py  sayfa şablonları
├── README.md               Bu dosya
└── HANDOVER.md             Geliştirici / yapay zekâ asistanı için devir notları
```

## Yerelde nasıl açılır?

**En kolay yol:** `index.html` dosyasına çift tıklayın. Tüm bağlantılar göreli olduğundan site tarayıcıda çalışır.

**Önerilen yol (yerel sunucu):** Proje filtresinin `?tema=` bağlantıları ve kopyalama düğmesi gibi
özellikler en iyi bir yerel sunucuyla çalışır:

```bash
cd biriz-demo
python3 -m http.server 8787
# Tarayıcıda: http://localhost:8787
```

İnternet bağlantısı gereklidir: logo (birizdernegi.org’dan) ve yazı tipleri (Google Fonts) dışarıdan yüklenir.
Bağlantı yoksa sistem yazı tipleri kullanılır; tasarım bozulmaz.

## İçerik nasıl düzenlenir?

- **Doğrudan:** `.html` dosyalarını herhangi bir metin düzenleyiciyle açıp metinleri değiştirebilirsiniz.
- **Toplu (önerilen):** Proje, haber, kişi ve iş birliği listeleri `_kaynak/data.py` içindedir.
  Düzenledikten sonra `python3 _kaynak/build.py` komutu tüm sayfaları yeniden üretir
  (header/footer/menü değişiklikleri de tek yerden — `_kaynak/common.py` — yapılır).
- **Ana sayfa rakamları:** `index.html` içinde `data-count="..."` değerlerini değiştirin.
- **IBAN’lar:** `bagis.html` içinde `[IBAN — canlıdan alınacak]` yazan yerleri (hem metin hem `data-copy`) güncelleyin.

## WordPress’e nasıl aktarılır?

Bu demo, WordPress’e geçişte **referans tasarım ve içerik kaynağı** olarak düşünülmüştür:

1. **Tema:** Hafif bir blok teması (ör. GeneratePress / Kadence / bir Twenty Twenty-Four alt teması) kurun;
   `css/styles.css` içindeki renk ve yazı tipi değişkenlerini (`:root`) temanın global ayarlarına (theme.json) taşıyın.
2. **Sayfalar:** Her `.html` dosyası bir WordPress sayfasına karşılık gelir; aynı kısa adları (slug) kullanın
   (`hakkimizda`, `yonetim`, `ekibimiz`, `calisma-alanlari`, `projeler`, `isbirlikleri`, `haberler`, `kaynaklar`, `iletisim`, `bagis`).
   Bölümler Gutenberg blokları/desenleri (pattern) olarak yeniden kurulabilir.
3. **Projeler ve haberler:** Projeler için “Proje” özel yazı türü (yıl, tema, durum, ortak alanlarıyla — ACF veya yerleşik
   meta alanları), haberler için standart “Yazılar” önerilir. `_kaynak/data.py` içeriği CSV’ye dökülüp içe aktarılabilir.
4. **Form:** İletişim formu Contact Form 7 / WPForms / Fluent Forms ile yeniden kurulmalı; KVKK onay kutusu korunmalıdır.
5. **Yönlendirmeler:** Mevcut sitedeki eski adresler (ör. `/kurucular-ve-yonetim-kurulu/`, `/ekibimiz-2/`,
   `/calisma-alanlari-yontemleri-hedef-kitlesi/`, `/projelerimiz/`) yeni adreslere 301 ile yönlendirilmelidir (Redirection eklentisi).
6. **Belgeler:** Mali tablo ve beyanname PDF’leri Ortam Kütüphanesi’nde aynı adreslerinde tutulmalı ya da yönlendirilmelidir.

Ayrıntılı teknik notlar için **HANDOVER.md** dosyasına bakın.

## İletişim

Birey ve Toplum Ruh Sağlığında İZ Derneği · Kadıköy / İstanbul · 0530 692 47 49 · bilgi@birizdernegi.org
