export default function ContactMap() {
  return (
    <div className="contact_location-section">
      <div className="contact_location-main">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d828.8254020593767!2d10.456789!3d34.965432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130213abcd123456%3A0xabcdef123456789!2sZI%20Menzel%20Chaker%20-%20BP%20N%C2%BA14%2C%203020%20Menzel%20Chaker%2C%20Sfax%2C%20Tunisie!5e0!3m2!1sfr!2stn!4v1711391234567!5m2!1sfr!2stn"
          height={780}
          style={{ border: 0, width: "100%" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
