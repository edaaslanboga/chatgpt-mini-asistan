# ChatGPT Mini Asistan - Web

Bu proje, React kullanılarak geliştirilmiş sade ve şık bir arayüze sahip bir mini yapay zeka asistanıdır. Kullanıcılar metin yazarak ChatGPT-3.5 modelinden yanıt alabilir.

 Özellikler

- Kullanıcıdan gelen soruyu backend'e iletme
- OpenAI API kullanımı
- Sohbet geçmişi kaydı (soru-cevap)
- Konuşma baloncukları ile görsel sohbet tasarımı
- `localhost:5000/api/chat` üzerinden backend ile iletişim

Teknolojiler

- React
- Fetch API
- CSS (inline style)
 Kurulum

```bash
npm install
npm start
Projenin çalışabilmesi için backend (chatgpt-server) sunucusunun da aynı anda çalışıyor olması gerekir.

Bağlı Proje
Backend tarafı: chatgpt-server
