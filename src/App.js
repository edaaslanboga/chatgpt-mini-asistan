import React, { useState } from "react";

export default function ChatGPTMiniAsistan() {
  const [soru, setSoru] = useState("");
  const [cevap, setCevap] = useState("");
  const [loading, setLoading] = useState(false);
  const [gecmis, setGecmis] = useState([]); // ← doğru yer burası

  const handleGonder = async () => {
    if (!soru) return;
    setLoading(true);
    setCevap("");

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: soru }),
      });

      const data = await response.json();

      if (data.choices && data.choices.length > 0) {
        const yanit = data.choices[0].message.content;
        setCevap(yanit);

        // 👇 Sohbet geçmişine ekle
        setGecmis((prev) => [...prev, { soru, cevap: yanit }]);
      } else {
        setCevap("Cevap alınamadı.");
      }

    } catch (error) {
      console.error("Frontend Hatası:", error.message || error.toString());
      setCevap("Bir hata oluştu.");
    }

    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fbe8d3, #f3d1a4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Segoe UI"
    }}>
      <div style={{
        background: "rgba(255,255,255,0.9)",
        padding: "30px",
        borderRadius: "20px",
        width: "100%",
        maxWidth: "500px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{ textAlign: "center", fontSize: "24px", marginBottom: "20px", color: "#5d3c2a" }}>
          ChatGPT Mini Asistan
        </h1>

        <input
          type="text"
          placeholder="Bir şey yaz..."
          value={soru}
          onChange={(e) => setSoru(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #d9a87c",
            marginBottom: "15px"
          }}
        />

        <button
          onClick={handleGonder}
          disabled={loading}
          style={{
            width: "100%",
            backgroundColor: "#d09463",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          {loading ? "Yanıt Bekleniyor..." : "Gönder"}
        </button>

        {cevap && (
          <div style={{
            marginTop: "20px",
            backgroundColor: "#fef3e6",
            padding: "15px",
            borderRadius: "10px",
            whiteSpace: "pre-line",
            color: "#5d3c2a"
          }}>
            {cevap}
          </div>
        )}

{gecmis.length > 0 && (
  <div style={{ marginTop: "40px" }}>
    <h3 style={{ marginBottom: "10px" }}>🕓 Sohbet Geçmişi</h3>
    <div style={{
      maxHeight: "300px",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }}>
      {gecmis.map((item, index) => (
        <div key={index}>
          {/* Kullanıcı baloncuğu */}
          <div style={{
            alignSelf: "flex-end",
            backgroundColor: "#d09463",
            color: "white",
            padding: "10px 15px",
            borderRadius: "15px 15px 0 15px",
            maxWidth: "70%",
            marginLeft: "auto"
          }}>
            {item.soru}
          </div>

          {/* Asistan baloncuğu */}
          <div style={{
            alignSelf: "flex-start",
            backgroundColor: "#fef3e6",
            color: "#5d3c2a",
            padding: "10px 15px",
            borderRadius: "15px 15px 15px 0",
            maxWidth: "70%",
            marginRight: "auto"
          }}>
            {item.cevap}
          </div>
        </div>
      ))}
    </div>
  </div>
)}

        
      </div>
    </div>
  );
}
