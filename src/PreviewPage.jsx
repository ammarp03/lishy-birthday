import React, { useState, useEffect, useRef } from "react";

const PICS = "/pics";

export default function PreviewPage() {
  const boxMailRef = useRef(null);
  const [mailOpen, setMailOpen] = useState(false);
  const [letterReveal, setLetterReveal] = useState(false);
  const [dateText, setDateText] = useState("");
  const [dateDone, setDateDone] = useState(false);
  const dateFull = "22 January";

  // Auto-open the letter and show content after 1.5s (for hover and touch)
  useEffect(() => {
    if (!mailOpen) {
      setLetterReveal(false);
      return;
    }
    const t = setTimeout(() => setLetterReveal(true), 1500);
    return () => clearTimeout(t);
  }, [mailOpen]);

  // Keep letter scroll at top when opening (stops content from appearing "moved up")
  useEffect(() => {
    if (mailOpen && boxMailRef.current) {
      boxMailRef.current.scrollTop = 0;
    }
  }, [mailOpen]);

  useEffect(() => {
    const ref = { intervalId: null };
    const t = setTimeout(() => {
      let i = 1;
      ref.intervalId = setInterval(() => {
        setDateText(dateFull.slice(0, i));
        i++;
        if (i > dateFull.length) {
          setDateDone(true);
          clearInterval(ref.intervalId);
        }
      }, 100);
    }, 12000);
    return () => {
      clearTimeout(t);
      if (ref.intervalId) clearInterval(ref.intervalId);
    };
  }, [dateFull]);

  return (
    <div className="preview-page">
      <div className="flag__birthday">
        <img src={`${PICS}/1.png`} alt="" width={350} className="flag__left" />
        <img src={`${PICS}/1.png`} alt="" width={350} className="flag__right" />
      </div>
      <div className="content">
        <div className="left">
          <div className="title">
            <h1 className="happy">
              <span style={{ "--t": "4s" }}>H</span>
              <span style={{ "--t": "4.2s" }}>a</span>
              <span style={{ "--t": "4.4s" }}>p</span>
              <span style={{ "--t": "4.6s" }}>p</span>
              <span style={{ "--t": "4.8s" }}>y</span>
            </h1>
            <h1 className="birthday">
              <span style={{ "--t": "5s" }}>B</span>
              <span style={{ "--t": "5.2s" }}>i</span>
              <span style={{ "--t": "5.4s" }}>r</span>
              <span style={{ "--t": "5.6s" }}>t</span>
              <span style={{ "--t": "5.8s" }}>h</span>
              <span style={{ "--t": "6s" }}>d</span>
              <span style={{ "--t": "6.2s" }}>a</span>
              <span style={{ "--t": "6.4s" }}>y</span>
            </h1>
            <div className="hat">
              <img src={`${PICS}/hat.png`} alt="" width={130} />
            </div>
          </div>
          <div className="date__of__birth">
            {dateDone && <i className="fa-solid fa-star" />}
            <span>{dateText}</span>
            {dateDone && <i className="fa-solid fa-star" />}
          </div>
          <div className="btn">
            <button type="button" id="btn__letter" onClick={() => setMailOpen(true)}>
              <div className={`mail ${mailOpen ? "active" : ""}`}>
                Click Here Jaaanu
                <i className="fa-regular fa-envelope" />
              </div>
            </button>
          </div>
        </div>
        <div className="right">
          <div className="box__account">
            <div className="image">
              <img src={`${PICS}/unnamed.jpeg`} alt="" />
            </div>
            <div className="name">
              <i className="fa-solid fa-heart" />
              <span>Dear Lishy</span>
              <i className="fa-solid fa-heart" />
            </div>
            <div className="balloon_one">
              <img width={100} src={`${PICS}/balloon1.png`} alt="" />
            </div>
            <div className="balloon_two">
              <img width={100} src={`${PICS}/balloon2.png`} alt="" />
            </div>
          </div>
          <div className="cricle">
            <div className="text__cricle">
              <span style={{ "--i": 1 }}>h</span>
              <span style={{ "--i": 2 }}>a</span>
              <span style={{ "--i": 3 }}>p</span>
              <span style={{ "--i": 4 }}>p</span>
              <span style={{ "--i": 5 }}>y</span>
              <span style={{ "--i": 6 }}>-</span>
              <span style={{ "--i": 7 }}>b</span>
              <span style={{ "--i": 8 }}>i</span>
              <span style={{ "--i": 9 }}>r</span>
              <span style={{ "--i": 10 }}>t</span>
              <span style={{ "--i": 11 }}>h</span>
              <span style={{ "--i": 12 }}>d</span>
              <span style={{ "--i": 13 }}>a</span>
              <span style={{ "--i": 14 }}>y</span>
              <span style={{ "--i": 15 }}>-</span>
            </div>
            <i className="fa-solid fa-heart" />
          </div>
        </div>
      </div>
      <div className="decorate_star star1" style={{ "--t": "15s" }} />
      <div className="decorate_star star2" style={{ "--t": "15.2s" }} />
      <div className="decorate_star star3" style={{ "--t": "15.4s" }} />
      <div className="decorate_star star4" style={{ "--t": "15.6s" }} />
      <div className="decorate_star star5" style={{ "--t": "15.8s" }} />
      <div className="decorate_flower--one" style={{ "--t": "15s" }}>
        <img width={20} src={`${PICS}/decorate_flower.png`} alt="" />
      </div>
      <div className="decorate_flower--two" style={{ "--t": "15.3s" }}>
        <img width={20} src={`${PICS}/decorate_flower.png`} alt="" />
      </div>
      <div className="decorate_flower--three" style={{ "--t": "15.6s" }}>
        <img width={20} src={`${PICS}/decorate_flower.png`} alt="" />
      </div>
      <div className="decorate_bottom">
        <img src={`${PICS}/decorate.png`} alt="" width={100} />
      </div>
      <div className="smiley__icon">
        <img src={`${PICS}/smiley_icon.png`} alt="" width={100} />
      </div>

      <div ref={boxMailRef} className={`boxMail ${mailOpen ? "active" : ""} ${letterReveal ? "letter-reveal" : ""}`}>
        <i className="fa-solid fa-xmark" onClick={() => setMailOpen(false)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setMailOpen(false)} aria-label="Close" />
        <div className="boxMail-container">
          <div className="card1">
            <div className="userImg">
              <img src={`${PICS}/unnamed.jpeg`} alt="" />
            </div>
            <h4 className="username">To: Lishy 💖<span className="underline" /></h4>
            <h3>Happy Birthday</h3>
            <div className="imageCute">
              <img src={`${PICS}/heart.png`} alt="" />
            </div>
          </div>
          <div className="card2">
            <div className="card2-content">
              <h3>To You!</h3>
              <h2>
              Happiest Birthdayyyy to myy dearest Lishyyy ❤️. The most closettt person to the heart 💕. I wishhh ap hameshhaaa khush rhooo strong rhooo . May Allah your life soooo beautifulll ❤️. I will always take care of your feelings your words your care ❣️ forever and forever 🤍. You are the beautiful part of my life 😭. May I wishh k hum next year birthday akhathy celebrate krainnn 💞🫶🏼.ap wo ho jis ny mujay sikhaya k life ki ak guzarna ki ak reason hoti hai . I will always try to control myself for you jis ki wajah sy ap hurt hun 💓.I loveeee youuuu soooo muchhhh ❤️. Thank you so much for accepting me as I'm. I will always try to be a better person for you 💞. You are my happiness 🫶🏼 maira bchaaa 💕.You are pretty 😍 gorgeous 🧡 Amazing 💛 wonderful 💚 greatest 🩵 lovely 💙 cutieeeee 💜🤎 Elegant 🩶 Graceful 🤍🩷 Unreal 💝 Pretty asf💖
              </h2>
              <div className="imageCute2">
                <img src={`${PICS}/love.png`} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
