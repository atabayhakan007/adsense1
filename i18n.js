// Internationalization (i18n) Module
export const translations = {
    tr: {
        // App Layout / Nav
        logo_text: "FinCalc Pro",
        nav_fire: "🔥 FIRE Hesaplayıcı",
        nav_mortgage: "🏡 Ev Alma vs. Kira",
        nav_freelance: "💼 Freelance Saat Ücreti",
        nav_inflation: "💸 Enflasyon Erimesi",
        btn_share: "Planı Paylaş",
        btn_print: "Raporu Yazdır / PDF",
        toast_copied: "✨ Link kopyalandı! Planınızı paylaşmaya hazırsınız.",
        copyright: "&copy; 2026 FinCalc Pro. Tüm Hakları Saklıdır.",
        link_about: "Hakkımızda",
        link_privacy: "Gizlilik Politikası",
        disclaimer: "Yasal Uyarı: Hesaplamalar yalnızca bilgilendirme amaçlıdır. Yatırım tavsiyesi değildir. Bazı tavsiye edilen ürünlerin gelir ortağıyız (Affiliate).",
        nav_admin: "⚙️ Admin Dashboard",
        tab_admin_title: "Yönetici Ayarları Kontrol Paneli",
        tab_admin_subtitle: "Google AdSense yayıncı kimliklerini, reklam yerleşim kodlarını, Google Analytics takip kodunu, bülten formlarını ve affiliate linklerini veritabanı olmadan kolayca yönetin.",
        admin_btn_save: "Ayarları Lokal Kaydet (Test)",
        admin_btn_download: "config.js Dosyasını İndir (Canlı)",
        admin_success_save: "✨ Ayarlar yerel olarak kaydedildi! Sayfa yenileniyor.",
        admin_header_adsense: "Google AdSense & Analitik",
        admin_header_affiliate: "Gelir Ortaklığı (Affiliate) Yönlendirme Linkleri",
        admin_header_newsletter: "E-posta Bülteni & Kayıt Altyapısı",
        admin_label_adsense_client: "AdSense Yayıncı Kimliği (ca-pub-xxx)",
        admin_label_adsense_header: "Üst Banner Reklam Slot ID",
        admin_label_adsense_sidebar: "Yan Menü Reklam Slot ID",
        admin_label_adsense_native: "İçerik İçi Doğal Reklam Slot ID",
        admin_label_adsense_sticky: "Yapışkan Alt Reklam Slot ID",
        admin_label_analytics: "Google Analytics Ölçüm Kimliği (G-xxx)",
        admin_label_newsletter_endpoint: "Bülten Entegrasyon Linki (Substack, özel API vb.)",
        admin_label_affiliate_fire: "FIRE Hesaplayıcı Aracı Kurum Linki",
        admin_label_affiliate_mortgage: "Ev vs. Kira Kredi Karşılaştırma Linki",
        admin_label_affiliate_freelance: "Freelance Ödeme Alma Platformu Linki (Wise)",
        admin_label_affiliate_inflation: "Enflasyon Mevduat Hesabı (HYSA) Linki",

        // Document Metadata (Dynamic Headers)
        tab_fire_title: "FIRE (Finansal Özgürlük) Hesaplayıcı",
        tab_fire_subtitle: "Mevcut birikimleriniz ve tasarruf oranınızla ne zaman finansal özgürlüğe ulaşacağınızı hesaplayın.",
        tab_mortgage_title: "Ev Alma vs. Kira Karşılaştırması",
        tab_mortgage_subtitle: "Konut kredisi ile ev satın almanın mı yoksa kirada kalıp yatırım yapmanın mı daha karlı olduğunu simüle edin.",
        tab_freelance_title: "Freelance Saat Ücreti Hesaplayıcı",
        tab_freelance_subtitle: "Hedeflediğiniz yıllık net kazancı, vergileri ve giderleri karşılayacak saatlik çalışma ücretinizi belirleyin.",
        tab_inflation_title: "Enflasyon Erime Simülatörü",
        tab_inflation_subtitle: "Paranızın enflasyon karşısında yıllar içindeki erimesini ve reel alım gücü kaybını görün.",

        // FIRE Calculator
        label_values: "Hesaplama Değerleri",
        fire_current_age: "Mevcut Yaşınız",
        fire_net_worth: "Mevcut Toplam Birikim",
        fire_monthly_savings: "Aylık Ek Tasarruf / Birikim",
        fire_monthly_expenses: "Emeklilik Sonrası Aylık Gider",
        fire_roi: "Yıllık Yatırım Getirisi (Nominal %)",
        fire_inflation: "Yıllık Ortalama Enflasyon (%)",
        
        fire_metric_age: "Finansal Özgürlük Yaşı",
        fire_metric_target: "Gereken Hedef Birikim",
        fire_metric_total: "Toplam Birikim (Emeklilikte)",
        fire_sub_target: "4% kuralına göre (SWR)",
        fire_sub_real: "Enflasyondan arındırılmış değer",
        fire_calc_never: "Asla",
        fire_age_val: "{age} Yaş",
        fire_calc_insufficient: "Mevcut birikim/gider oranı yetersiz",
        fire_calc_years_left: "Emekliliğe {years} yıl kaldı",
        fire_calc_display_wealth: "{age} yaşındaki birikim tahmini",
        fire_chart_wealth: "Birikim Gelişimi (Enflasyondan Arındırılmış)",
        fire_chart_target: "FIRE Hedefi (4% SWR Kuralı)",

        // Mortgage vs Rent
        mort_home_price: "Satın Alınacak Ev Fiyatı",
        mort_down_payment: "Peşinat Tutarı",
        mort_loan_term: "Mortgage Vadesi",
        mort_interest: "Mortgage Yıllık Faiz Oranı (%)",
        mort_rent: "Aylık Kira Bedeli",
        "mort_rent-increase": "Yıllık Kira Artış Oranı (%)",
        
        mort_metric_winner: "Karlı Seçenek (Simülasyon Sonunda)",
        mort_metric_payment: "Aylık Kredi Ödemesi",
        mort_metric_interest: "Toplam Ödenecek Faiz",
        mort_sub_payment: "Sadece Anapara ve Faiz",
        mort_sub_interest: "Vade sonu toplam maliyet",
        mort_buy_winner: "Ev Satın Almak",
        mort_rent_winner: "Kirada Kalmak",
        mort_savings_diff: "{diff} daha karlı",
        mort_chart_buy: "Satın Alma Senaryosu (Ev Değeri + Yatırımlar)",
        mort_chart_rent: "Kira Senaryosu (Biriken Yatırımlar)",
        
        mort_table_title: "Yıllık Amortisman ve Kredi Ödeme Tablosu",
        mort_btn_download: "Tabloyu İndir (CSV)",
        mort_th_year: "Yıl",
        mort_th_start: "Başlangıç Borcu",
        mort_th_principal: "Anapara Ödemesi",
        mort_th_interest: "Faiz Ödemesi",
        mort_th_end: "Kalan Borç",

        // Freelance Rate
        free_target_income: "Hedef Yıllık Net Gelir",
        free_expenses: "Aylık İş Giderleri",
        free_tax: "Gelir Vergisi Oranı (%)",
        free_weekly_hours: "Haftalık Faturalanabilir Çalışma (Saat)",
        free_vacation: "Yıllık Ücretsiz İzin (Hafta)",
        
        free_metric_rate: "Talep Etmeniz Gereken Saat Ücreti",
        free_metric_tax: "Yıllık Toplam Vergi",
        free_metric_hours: "Çalışacağınız Saat (Yıllık)",
        free_sub_gross: "Yıllık gereken brüt gelir: {gross}",
        free_sub_tax: "Vergi kesintileri",
        free_sub_hours: "Tatiller hariç toplam saat",
        free_table_title: "Finansal Gelir & Gider Dağılımı",
        free_btn_download: "Raporu İndir (CSV)",
        
        free_th_item: "Kalem",
        free_th_monthly: "Aylık",
        free_th_yearly: "Yıllık",
        free_row_net: "Hedef Net Gelir",
        free_row_exp: "İşletme Giderleri",
        free_row_tax: "Hesaplanan Gelir Vergisi",
        free_row_gross: "Gereken Brüt Kazanç",

        // Inflation
        inf_starting_amount: "Başlangıç Nakit Tutarı",
        inf_inflation_rate: "Beklenen Yıllık Enflasyon (%)",
        inf_years: "Simülasyon Süresi (Yıl)",
        
        inf_metric_power: "Gelecekteki Satın Alma Gücü",
        inf_metric_lost: "Toplam Satın Alma Gücü Kaybı",
        inf_metric_target: "Aynı Gücü Korumak İçin Gereken Para",
        inf_sub_lost: "{pct}% erime oranı",
        inf_sub_lost_val: "Erime miktarı",
        inf_sub_target: "Vade sonundaki nominal karşılık",
        inf_chart_power: "Paranızın Satın Alma Gücü (Enflasyon Karşısında)",
        inf_chart_target: "Aynı Satın Alma Gücünü Korumak İçin Gereken Para",

        // Modal content - About
        about_title: "Hakkımızda - FinCalc Pro",
        about_body: `
            <p><strong>FinCalc Pro</strong>, kişisel finans yönetimini kolaylaştırmak, geleceğinizi daha bilinçli ve matematiksel temellere dayanarak planlamanızı sağlamak amacıyla kurulmuş ücretsiz bir finansal hesaplama platformudur.</p>
            <p>Platformumuzda sunduğumuz tüm araçlar, tamamen tarayıcınız üzerinde (client-side) çalışır. Bu sayede girdiğiniz hassas finansal veriler hiçbir sunucuya yüklenmez, saklanmaz ve %100 gizli kalır.</p>
            <h3>Misyonumuz</h3>
            <p>Kullanıcılarımızın finansal okuryazarlık seviyelerini artırmak, bileşik faiz ve enflasyon gibi kritik ekonomik kavramları görselleştirerek anlaşılır kılmak ve FIRE (Erken Emeklilik) gibi finansal özgürlük hedeflerini somutlaştırmaktır.</p>
        `,

        // Modal content - Privacy Policy
        privacy_title: "Gizlilik Politikası",
        privacy_body: `
            <p>Bu Gizlilik Politikası, FinCalc Pro web sitesini ziyaret ettiğinizde elde edilen bilgilerin nasıl yönetildiğini açıklar.</p>
            
            <h3>1. Kişisel Verilerin Korunması</h3>
            <p>Platformumuzda hesaplama yapmak için kullandığınız hiçbir veri (yaş, gelir, birikim, gider vb.) veritabanlarımızda saklanmaz. Tüm hesaplama işlemleri cihazınızın tarayıcısında anlık olarak gerçekleşmektedir.</p>
            
            <h3>2. Çerezler (Cookies) ve Google AdSense</h3>
            <p>Sitemizde Google AdSense reklam hizmetleri kullanılmaktadır. Google, web sitemizde reklam sunmak için çerezlerden yararlanır. Google'ın DART çerezlerini kullanması, kullanıcılarımızın sitemize ve İnternet'teki diğer sitelere yaptıkları ziyaretlere dayalı olarak reklam sunmasına olanak tanır.</p>
            <p>Kullanıcılar, <a href="https://policies.google.com/technologies/ads" target="_blank" style="color:var(--accent-primary);">Google Reklam ve İçerik Ağı gizlilik politikasını</a> ziyaret ederek DART çerezinin kullanılmasını engelleyebilirler.</p>
            
            <h3>3. Dış Bağlantılar</h3>
            <p>Sitemiz üçüncü taraf web sitelerine bağlantılar içerebilir. Bu sitelerin gizlilik politikalarından veya içeriklerinden sorumlu değiliz.</p>
            
            <h3>4. İletişim</h3>
            <p>Gizlilik politikamız hakkında sorularınız için bizimle <em>support@fincalc.net</em> adresinden iletişime geçebilirsiniz.</p>
        `,

        // Embed Widget
        embed_title: "Bu Hesaplayıcıyı Sitenize Gömün",
        embed_desc: "Bu finansal aracı sitenize ücretsiz yerleştirerek ziyaretçilerinize değer katın. Aşağıdaki kodu kopyalamanız yeterlidir:",
        embed_copy_btn: "Kodu Kopyala",
        embed_copied: "Kopyalandı! 🚀",

        // Affiliate Card Keys
        promo_title_fire: "Yatırım Yapmaya Başlayın",
        promo_desc_fire: "Erken emeklilik hedefinize ulaşmak için paranızı çalıştırın. Düşük komisyon ve küresel hisseler için lider lisanslı aracı kurumları inceleyin.",
        promo_btn_fire: "Hesap Aç & Başla",

        promo_title_mortgage: "Kredi Oranlarını Karşılaştırın",
        promo_desc_mortgage: "Satın alacağınız ev için en uygun mortgage ve konut kredisi oranlarını karşılaştırarak binlerce dolar tasarruf edin.",
        promo_btn_mortgage: "Oranları Karşılaştır",

        promo_title_freelance: "Uluslararası Ödemelerinizi Alın",
        promo_desc_freelance: "Wise Business hesabı ile faturalarınızı düşük komisyonla tahsil edin, döviz kayıplarını en aza indirin.",
        promo_btn_freelance: "Ücretsiz Hesap Aç",

        promo_title_inflation: "Paranızı Enflasyona Karşı Koruyun",
        promo_desc_inflation: "Nakitinizin erimesini engelleyin. En yüksek getiri sağlayan faiz hesaplarını (HYSA) veya yatırım fonlarını inceleyin.",
        promo_btn_inflation: "En İyi Oranları Gör",

        // Newsletter Subscription
        news_title: "Detaylı Finansal Raporunuzu Alın (PDF)",
        news_desc: "Kişiselleştirilmiş birikim tahminlerinizi, büyüme grafiklerinizi ve kişisel finans kontrol listesini içeren kapsamlı PDF raporunuzu e-posta adresinize gönderelim.",
        news_placeholder: "E-posta adresinizi girin",
        news_btn: "Raporumu Gönder",
        news_success: "✨ Kontrol edin! Kişiselleştirilmiş PDF raporunuz {email} adresine gönderilmek üzere yola çıktı.",

        // FAQ Articles
        faq_title: "Sıkça Sorulan Sorular",
        faq_fire_html: `
            <h3>FIRE Hareketi Nedir?</h3>
            <p>FIRE (Financial Independence, Retire Early - Finansal Özgürlük, Erken Emeklilik), genç yaşta finansal bağımsızlığa ulaşarak standart emeklilik yaşından çok daha önce emekli olmayı hedefleyen bir finansal felsefedir.</p>
            <h3>%4 Kuralı (SWR - Güvenli Çekim Oranı) Nedir?</h3>
            <p>Tarihsel borsa verilerine dayanan bu kural, emekliliğinizin ilk yılında birikimlerinizin %4'ünü çekip sonraki yıllarda bu tutarı enflasyon oranında artırırsanız, paranızın en az 30 yıl boyunca yeteceğini öngörür.</p>
            <h3>Enflasyon FIRE Planımı Nasıl Etkiler?</h3>
            <p>Enflasyon satın alma gücünüzü zamanla düşürür. Bu nedenle portföyünüzün enflasyondan daha hızlı büyümesi gerekir. Bu hesaplayıcı, nominal getiriden enflasyon oranını düşerek reel getiri oranıyla geleceği simüle eder.</p>
        `,
        faq_mortgage_html: `
            <h3>Ev mi Satın Almalıyım Yoksa Kiralamalı mıyım?</h3>
            <p>Tek bir doğru cevap yoktur. Ev satın almak birikim yapmanızı ve mülk sahibi olmanızı sağlar ancak faiz, vergi ve bakım masrafları yüksektir. Kirada kalıp peşinatı borsada değerlendirmek uzun vadede daha karlı olabilir.</p>
            <h3>Peşinatın Fırsat Maliyeti Nedir?</h3>
            <p>Peşinat olarak eve bağladığınız nakit parayı borsada veya fonlarda değerlendirmeyerek kaçırdığınız potansiyel yatırım getirisine fırsat maliyeti denir.</p>
            <h3>Neden Net Değer (Net Worth) Karşılaştırılıyor?</h3>
            <p>Net değer en objektif finansal ölçüttür. Evin değer artışı ve azalan borç ile kiracının biriken hisse senedi portföyü karşılaştırılarak hangisinin zenginleştiği matematiksel olarak kanıtlanır.</p>
        `,
        faq_freelance_html: `
            <h3>Freelance Saat Ücretimi Nasıl Belirlemeliyim?</h3>
            <p>Saatlik ücretiniz hedef net maaşınızı, aylık iş masraflarınızı ve vergilerinizi karşılamalıdır. Ayrıca ücret almadığınız tatil ve hastalık günlerini de hesaba katmalıdır.</p>
            <h3>Brütleştirme (Gross-Up) Vergisi Nedir?</h3>
            <p>Vergiler brüt gelir üzerinden kesildiği için fatura bedelini belirlerken vergileri de üstüne eklemeniz gerekir. Formül: <code>Brüt = (Net Hedef + Giderler) / (1 - Vergi Oranı)</code>.</p>
        `,
        faq_inflation_html: `
            <h3>Enflasyon Erimesi Nedir?</h3>
            <p>Enflasyon, mal ve hizmet fiyatlarının genel düzeyinin yükselmesi ve dolayısıyla paranın satın alma gücünün düşmesidir. Nakit parayı yatırım yapmadan faizsiz hesapta tutmak erimesine yol açar.</p>
            <h3>Paramı Enflasyondan Nasıl Korurum?</h3>
            <p>Paranızı enflasyondan daha yüksek getiri sunan endeks fonlarına (hisselere), gayrimenkule veya yüksek getirili mevduat hesaplarına (HYSA) yatırarak koruyabilirsiniz.</p>
        `
    },
    en: {
        // App Layout / Nav
        logo_text: "FinCalc Pro",
        nav_fire: "🔥 FIRE Calculator",
        nav_mortgage: "🏡 Buy vs. Rent",
        nav_freelance: "💼 Freelance Hourly Rate",
        nav_inflation: "💸 Inflation Erosion",
        btn_share: "Share Plan",
        btn_print: "Print / Save PDF",
        toast_copied: "✨ Link copied! Ready to share your plan.",
        copyright: "&copy; 2026 FinCalc Pro. All rights reserved.",
        link_about: "About Us",
        link_privacy: "Privacy Policy",
        disclaimer: "Disclaimer: Calculations are for informational purposes only. Not financial advice. We are affiliate partners with some recommended products.",
        nav_admin: "⚙️ Admin Dashboard",
        tab_admin_title: "Admin Settings Dashboard",
        tab_admin_subtitle: "Manage Google AdSense client IDs, slot parameters, Google Analytics tracking codes, newsletter forms, and affiliate redirect links without a database.",
        admin_btn_save: "Save Config Locally (Test)",
        admin_btn_download: "Download config.js (Production)",
        admin_success_save: "✨ Settings saved locally! Page is refreshing to apply changes.",
        admin_header_adsense: "Google AdSense & Analytics",
        admin_header_affiliate: "Affiliate Partner Redirect Links",
        admin_header_newsletter: "Lead Generation & Newsletters",
        admin_label_adsense_client: "AdSense Client ID (ca-pub-xxx)",
        admin_label_adsense_header: "Header Ad Unit Slot ID",
        admin_label_adsense_sidebar: "Sidebar Ad Unit Slot ID",
        admin_label_adsense_native: "Native Ad Unit Slot ID",
        admin_label_adsense_sticky: "Sticky Footer Ad Unit Slot ID",
        admin_label_analytics: "Google Analytics Measurement ID (G-xxx)",
        admin_label_newsletter_endpoint: "Newsletter Integration URL (Substack, custom API etc.)",
        admin_label_affiliate_fire: "FIRE Calculator Broker Link",
        admin_label_affiliate_mortgage: "Mortgage Live Rates Comparison Link",
        admin_label_affiliate_freelance: "Freelance Payment Platform Link (Wise)",
        admin_label_affiliate_inflation: "Inflation High-Yield Savings Account Link",

        // Document Metadata (Dynamic Headers)
        tab_fire_title: "FIRE (Financial Independence, Retire Early) Calculator",
        tab_fire_subtitle: "Calculate when you will achieve financial freedom based on your current net worth and savings rate.",
        tab_mortgage_title: "Buy vs. Rent comparison",
        tab_mortgage_subtitle: "Simulate whether it is more profitable to buy a home with a mortgage or rent and invest the difference.",
        tab_freelance_title: "Freelance Hourly Rate Calculator",
        tab_freelance_subtitle: "Determine your hourly rate to cover your target annual net income, business expenses, and taxes.",
        tab_inflation_title: "Inflation Erosion Simulator",
        tab_inflation_subtitle: "See the erosion of your money over the years due to inflation and the loss of real purchasing power.",

        // FIRE Calculator
        label_values: "Calculator Inputs",
        fire_current_age: "Current Age",
        fire_net_worth: "Current Net Worth",
        fire_monthly_savings: "Monthly Additions / Savings",
        fire_monthly_expenses: "Monthly Expenses Post-Retirement",
        fire_roi: "Annual Investment Return (Nominal %)",
        fire_inflation: "Annual Average Inflation (%)",
        
        fire_metric_age: "Financial Freedom Age",
        fire_metric_target: "Target Net Worth Needed",
        fire_metric_total: "Total Wealth (At Retirement)",
        fire_sub_target: "Based on 4% rule (SWR)",
        fire_sub_real: "Inflation-adjusted real value",
        fire_calc_never: "Never",
        fire_age_val: "Age {age}",
        fire_calc_insufficient: "Current savings/expenses ratio is insufficient",
        fire_calc_years_left: "{years} years left to retirement",
        fire_calc_display_wealth: "Wealth projection at age {age}",
        fire_chart_wealth: "Wealth Growth (Inflation-Adjusted)",
        fire_chart_target: "FIRE Target (4% SWR Rule)",

        // Mortgage vs Rent
        mort_home_price: "Home Purchase Price",
        mort_down_payment: "Down Payment Amount",
        mort_loan_term: "Mortgage Term",
        mort_interest: "Mortgage Annual Interest Rate (%)",
        mort_rent: "Monthly Rent Amount",
        "mort_rent-increase": "Annual Rent Increase Rate (%)",
        
        mort_metric_winner: "Most Profitable Option (At Term End)",
        mort_metric_payment: "Monthly Mortgage Payment",
        mort_metric_interest: "Total Interest Paid",
        mort_sub_payment: "Principal and Interest Only",
        mort_sub_interest: "Total cost at term end",
        mort_buy_winner: "Buying a Home",
        mort_rent_winner: "Renting",
        mort_savings_diff: "{diff} more profitable",
        mort_chart_buy: "Buy Scenario (Property Value + Investments)",
        mort_chart_rent: "Rent Scenario (Accumulated Investments)",
        
        mort_table_title: "Annual Amortization & Mortgage Payment Schedule",
        mort_btn_download: "Download Schedule (CSV)",
        mort_th_year: "Year",
        mort_th_start: "Starting Balance",
        mort_th_principal: "Principal Paid",
        mort_th_interest: "Interest Paid",
        mort_th_end: "Ending Balance",

        // Freelance Rate
        free_target_income: "Target Annual Net Income",
        free_expenses: "Monthly Business Expenses",
        free_tax: "Income Tax Rate (%)",
        free_weekly_hours: "Weekly Billable Work (Hours)",
        free_vacation: "Annual Unpaid Leave (Weeks)",
        
        free_metric_rate: "Required Hourly Rate",
        free_metric_tax: "Total Annual Tax",
        free_metric_hours: "Billable Hours (Annual)",
        free_sub_gross: "Annual gross income required: {gross}",
        free_sub_tax: "Tax deductions",
        free_sub_hours: "Total hours excluding vacations",
        free_table_title: "Financial Income & Expense Breakdown",
        free_btn_download: "Download Report (CSV)",
        
        free_th_item: "Item",
        free_th_monthly: "Monthly",
        free_th_yearly: "Yearly",
        free_row_net: "Target Net Income",
        free_row_exp: "Business Expenses",
        free_row_tax: "Calculated Income Tax",
        free_row_gross: "Required Gross Income",

        // Inflation
        inf_starting_amount: "Starting Cash Amount",
        inf_inflation_rate: "Expected Annual Inflation (%)",
        inf_years: "Simulation Duration (Years)",
        
        inf_metric_power: "Future Purchasing Power",
        inf_metric_lost: "Total Purchasing Power Lost",
        inf_metric_target: "Amount Needed to Keep Power",
        inf_sub_lost: "{pct}% depreciation rate",
        inf_sub_lost_val: "Erosion amount",
        inf_sub_target: "Nominal value at term end",
        inf_chart_power: "Your Purchasing Power (Eroded by Inflation)",
        inf_chart_target: "Required Money to Maintain Purchasing Power",

        // Modal content - About
        about_title: "About Us - FinCalc Pro",
        about_body: `
            <p><strong>FinCalc Pro</strong> is a free financial calculation platform established to simplify personal finance management and enable you to plan your future on solid mathematical foundations.</p>
            <p>All the tools provided on our platform run entirely on your browser (client-side). This guarantees that your sensitive financial inputs are never uploaded to any server, never stored, and remain 100% confidential.</p>
            <h3>Our Mission</h3>
            <p>To increase the financial literacy of our users, make critical economic concepts like compound interest and inflation understandable through visualization, and solidify financial freedom goals such as FIRE (Retire Early).</p>
        `,

        // Modal content - Privacy Policy
        privacy_title: "Privacy Policy",
        privacy_body: `
            <p>This Privacy Policy explains how information obtained when you visit the FinCalc Pro website is managed.</p>
            
            <h3>1. Protection of Personal Data</h3>
            <p>None of the data you use to perform calculations on our platform (age, income, savings, expenses, etc.) is stored in our databases. All calculations are executed locally and instantly on your device's browser.</p>
            
            <h3>2. Cookies and Google AdSense</h3>
            <p>Google AdSense advertising services are used on our site. Google uses cookies to serve ads on our website. Google's use of DART cookies enables it to serve ads to our users based on their visits to our site and other sites on the Internet.</p>
            <p>Users may opt out of the use of the DART cookie by visiting the <a href="https://policies.google.com/technologies/ads" target="_blank" style="color:var(--accent-primary);">Google Ad and Content Network privacy policy</a>.</p>
            
            <h3>3. External Links</h3>
            <p>Our site may contain links to third-party websites. We are not responsible for the privacy policies or content of these sites.</p>
            
            <h3>4. Contact Us</h3>
            <p>For any questions regarding our privacy policy, you can contact us at <em>support@fincalc.net</em>.</p>
        `,

        // Embed Widget
        embed_title: "Embed This Calculator",
        embed_desc: "Add value to your website's audience by embedding this interactive financial calculator for free. Copy the code below:",
        embed_copy_btn: "Copy Embed Code",
        embed_copied: "Code Copied! 🚀",

        // Affiliate Card Keys
        promo_title_fire: "Start Investing Today",
        promo_desc_fire: "Put your money to work to reach your retirement goals. Compare leading brokerage platforms with low commissions and global markets.",
        promo_btn_fire: "Open Account & Invest",

        promo_title_mortgage: "Compare Live Mortgage Rates",
        promo_desc_mortgage: "Save thousands of dollars over the term by locking in the lowest interest rates from top lenders.",
        promo_btn_mortgage: "Compare Rates Now",

        promo_title_freelance: "Manage International Invoices",
        promo_desc_freelance: "Send and receive global client payments using Wise Business with up to 19x lower fees than standard bank transfers.",
        promo_btn_freelance: "Open Wise Business",

        promo_title_inflation: "Beat Inflation & Grow Savings",
        promo_desc_inflation: "Stop letting inflation erode your purchasing power. Compare the highest-yielding savings accounts (HYSA) on the market.",
        promo_btn_inflation: "Find Best HYSA Rates",

        // Newsletter Subscription
        news_title: "Get Your Detailed Financial Report (PDF)",
        news_desc: "Receive a comprehensive PDF report with your customized wealth projections, growth charts, and a personal finance checklist sent straight to your inbox.",
        news_placeholder: "Enter your email address",
        news_btn: "Email My Report",
        news_success: "✨ Check your inbox! Your personalized PDF report is on its way to {email}.",

        // FAQ Articles
        faq_title: "Frequently Asked Questions",
        faq_fire_html: `
            <h3>What is the FIRE Movement?</h3>
            <p>The FIRE (Financial Independence, Retire Early) movement is a lifestyle movement whose goal is to gain financial independence so you can retire much earlier than standard retirement ages (usually in your 30s or 40s).</p>
            <h3>What is the 4% Rule (Safe Withdrawal Rate)?</h3>
            <p>The 4% Rule is a guideline based on historical market data. It suggests that if you withdraw 4% of your total retirement portfolio in the first year of retirement, and adjust that amount for inflation every year thereafter, your money will likely last at least 30 years.</p>
            <h3>How does inflation affect my FIRE plans?</h3>
            <p>Inflation decreases your purchasing power over time, meaning the same basket of goods will cost more in the future. To counteract this, your investment portfolio must grow at a rate higher than inflation. This calculator uses a "real return rate" (Nominal ROI minus Inflation) to project all values in today's purchasing power.</p>
        `,
        faq_mortgage_html: `
            <h3>Should I Rent or Buy a House?</h3>
            <p>There is no one-size-fits-all answer. Buying builds equity in an appreciating asset and provides stability, but mortgage interest, property taxes, and maintenance fees can be costly. Renting is often cheaper monthly and offers flexibility, and the money saved from a downpayment can be invested in higher-yielding assets like stocks.</p>
            <h3>What is the Opportunity Cost of a Downpayment?</h3>
            <p>The opportunity cost of a downpayment is the potential return you lose by tying up your capital in home equity instead of investing it. For example, if you put $50,000 down on a house, you miss out on compounding that $50,000 at 7-8% annual returns in the stock market over 30 years.</p>
            <h3>Why does Rent vs Buy compare Net Worth?</h3>
            <p>Comparing net worth over a 30-year term is the ultimate financial metric. By calculating home appreciation and loan paydown on the buy side, versus the compounding value of a stock portfolio on the rent side, you get an objective mathematical winner.</p>
        `,
        faq_freelance_html: `
            <h3>How do I calculate my freelance hourly rate?</h3>
            <p>Your rate must cover your target net salary, business expenses (software, hardware, insurance), and taxes. It must also account for unpaid days off (vacations, sick leave) since freelancers are only paid for billable hours.</p>
            <h3>What is the Gross-Up tax calculation?</h3>
            <p>Since taxes are deducted from gross revenues, you must price your services such that your net revenue after taxes covers your expenses and target salary. The formula is: <code>Gross Required = (Net Target + Expenses) / (1 - Tax Rate)</code>.</p>
            <h3>How many billable hours can I work in a year?</h3>
            <p>A standard full-time employee works 2,000 hours a year (40 hours/week * 50 weeks). However, as a freelancer, you spend significant time on non-billable tasks (marketing, invoicing, client communication). A realistic estimate is 20-30 billable hours per week.</p>
        `,
        faq_inflation_html: `
            <h3>What is inflation erosion?</h3>
            <p>Inflation is the rate at which the general level of prices for goods and services rises, causing purchasing power to fall. Erosion is the steady loss of value that cash suffers when left idle in bank accounts that yield interest rates lower than the rate of inflation.</p>
            <h3>How can I protect my money from inflation?</h3>
            <p>To preserve purchasing power, your wealth must be invested in assets that grow faster than the inflation rate. Hedges include index funds (stocks), real estate, commodities, and High-Yield Savings Accounts (HYSAs) that offer interest rates close to or above inflation.</p>
            <h3>What is the difference between nominal and real values?</h3>
            <p>Nominal value refers to the face value of money at a specific point in time, without adjusting for price changes. Real value is adjusted for inflation, reflecting the actual purchasing power of that money. Our calculator projects both curves so you can see the gap.</p>
        `
    }
};

// Global localization state
export let currentLang = 'en';

// Global currency configuration
export let currentCurrency = localStorage.getItem('fincalc_currency') || 'USD';

export function setCurrency(currency) {
    currentCurrency = currency;
    localStorage.setItem('fincalc_currency', currency);
}

export function formatCurrency(val, currency = currentCurrency) {
    const symbolMap = {
        'USD': { sym: '$', pos: 'before', locale: 'en-US' },
        'EUR': { sym: '€', pos: 'before', locale: 'de-DE' },
        'TRY': { sym: '₺', pos: 'after', locale: 'tr-TR' },
        'GBP': { sym: '£', pos: 'before', locale: 'en-GB' }
    };
    const cfg = symbolMap[currency] || symbolMap['USD'];
    const formatted = Math.round(val).toLocaleString(cfg.locale);
    return cfg.pos === 'before' ? cfg.sym + formatted : formatted + ' ' + cfg.sym;
}

// Detect user's country/language based on browser locale
export function detectLanguage() {
    currentLang = 'en';
    return currentLang;
}

// Translate a key
export function t(key, replacements = {}) {
    let text = translations[currentLang][key] || translations['en'][key] || key;
    
    // Process string replacements like {years}
    for (const [placeholder, val] of Object.entries(replacements)) {
        text = text.replace(`{${placeholder}}`, val);
    }
    return text;
}

// Automatically translate DOM elements having data-i18n attributes
export function localizeDOM() {
    // 1. Translate standard text nodes
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translated = t(key);
        if (translated !== key) {
            // Check if element is an input placeholder
            if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
                el.setAttribute('placeholder', translated);
            } else {
                el.innerHTML = translated;
            }
        }
    });

    // 2. Localize dynamic page title
    document.title = (currentLang === 'tr') 
        ? "FinCalc Pro | Akıllı Finans ve FIRE Hesaplama Araçları" 
        : "FinCalc Pro | Smart Financial & FIRE Calculation Tools";
}
