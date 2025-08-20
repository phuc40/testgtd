const BIN_ID = "68a5544843b1c97be9230157"; // Bin ID của bạn
const API_KEY = "$2a$10$gNLsQVblklyrKD8nUWCInOi5zziOqP.RUdKl6YVyUR5nV12PiJXpW"; // Key của bạn
const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

// mật khẩu admin (tự đổi đi)
const ADMIN_PASS = "1111";

// === User nạp thẻ ===
window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cardForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const card = {
        loaiThe: document.getElementById("loaiThe").value,
        menhGia: document.getElementById("menhGia").value,
        soThe: document.getElementById("soThe").value,
        seri: document.getElementById("seri").value,
        time: new Date().toLocaleString()
      };
      try {
        let current = await fetch(`${API_URL}/latest`, {
          headers: { "X-Master-Key": API_KEY }
        }).then(r => r.json());

        let cards = current.record?.cards || [];
        cards.push(card);

        await fetch(API_URL, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Master-Key": API_KEY
          },
          body: JSON.stringify({ cards })
        });

        // ❌ Xoá dòng thông báo thành công
        // document.getElementById("msg").innerHTML = `<div class="success">Nạp thẻ thành công! Seri: ${card.seri}, Mệnh giá: ${card.menhGia}, Loại: ${card.loaiThe}</div>`;
        
        form.reset();
      } catch (err) {
        document.getElementById("msg").innerHTML = `<div class="error">Lỗi: ${err}</div>`;
      }
    });
  }
});

// === Admin xem thẻ ===
async function loadCards() {
  const pass = document.getElementById("adminPass").value;
  if (pass !== ADMIN_PASS) {
    alert("Sai mật khẩu!");
    return;
  }

  try {
    let data = await fetch(`${API_URL}/latest`, {
      headers: { "X-Master-Key": API_KEY }
    }).then(r => r.json());

    let cards = data.record?.cards || [];
    let html = `<table>
      <tr><th>Loại thẻ</th><th>Mệnh giá</th><th>Mã thẻ</th><th>Seri</th><th>Thời gian</th></tr>
      ${cards.map(c => `<tr>
        <td>${c.loaiThe}</td>
        <td>${c.menhGia}</td>
        <td>${c.soThe}</td>
        <td>${c.seri}</td>
        <td>${c.time}</td>
      </tr>`).join("")}
    </table>`;
    document.getElementById("data").innerHTML = html;
  } catch (err) {
    document.getElementById("data").innerHTML = `<div class="error">Lỗi: ${err}</div>`;
  }
}
