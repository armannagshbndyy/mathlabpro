// نمایش بخش‌ها
function showSection(id) {
  document.querySelectorAll("section").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// اعداد اول
function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++)if (n % i === 0) return false;
  return true;
}
function checkPrime() {
  let n = +document.getElementById("primeInput").value;
  document.getElementById("primeResult").textContent = isPrime(n) ? "عدد اول ✅" : "عدد مرکب ❌";
}
function listPrime() {
  let n = +document.getElementById("primeInput").value;
  let arr = [];
  for (let i = 2; i <= n; i++)if (isPrime(i)) arr.push(i);
  document.getElementById("primeResult").textContent = `(${arr.length}) → ` + arr.join(", ");
}
function factorPrime() {
  let n = +document.getElementById("primeInput").value;
  let factors = [];
  for (let i = 1; i <= n; i++)if (n % i === 0) factors.push(i);
  document.getElementById("primeResult").textContent = `شمارنده ها: ` + factors.join(", ");
}

// ماشین حساب پیشرفته
function calcAdvanced() {
  let expr = document.getElementById("calcInput").value;
  try {
    let result = eval(expr.replace(/\^/g, "**"));
    document.getElementById("calcResult").textContent = "نتیجه: " + result;
  } catch {
    document.getElementById("calcResult").textContent = "فرمول اشتباه!";
  }
}

// تحلیل لیست اعداد
function analyzeList() {
  let nums = document.getElementById("numList").value.split(",").map(Number).filter(n => !isNaN(n));
  if (!nums.length) { document.getElementById("statsResult").textContent = "لیست معتبر نیست"; return; }
  let max = Math.max(...nums);
  let min = Math.min(...nums);
  let sum = nums.reduce((a, b) => a + b, 0);
  let avg = sum / nums.length;
  document.getElementById("statsResult").textContent = `بیشترین: ${max} | کمترین: ${min} | مجموع: ${sum} | میانگین: ${avg.toFixed(2)}`;
}
/* ============================
 DEGREE TRIG FUNCTIONS
============================ */
function setTrig(type) {

  let input = document.getElementById("trigInput");

  switch (type) {

    case "sqrt": input.value += "sqrt("; break;
    case "cbrt": input.value += "cbrt("; break;
    case "pow": input.value += "pow("; break;
    case "abs": input.value += "abs("; break;

    case "sin": input.value += "sin("; break;
    case "cos": input.value += "cos("; break;
    case "tan": input.value += "tan("; break;

    case "log": input.value += "log("; break;
    case "log10": input.value += "log10("; break;

    case "factorial": input.value += "factorial("; break;
    case "gcd": input.value += "gcd("; break;
    case "lcm": input.value += "lcm("; break;

    case "mean": input.value += "mean("; break;
    case "variance": input.value += "variance("; break;

  
  }

}
function sinDeg(deg) {
  return Math.sin(deg * Math.PI / 180);
}
function solve(expr){
  try{
    return math.simplify(expr).toString();
  }catch{
    return "خطا در عبارت!";
  }
}
function cosDeg(deg) {
  return Math.cos(deg * Math.PI / 180);
}
function tanDeg(deg) {
  return Math.tan(deg * Math.PI / 180);
}

function calcTrig() {

  let expr = document.getElementById("trigInput").value;

  try {

    let replaced = expr

      /* ریاضی پایه */
      .replace(/\^/g, "**")
      .replace(/×/g, "*")
      .replace(/÷/g, "/")

      /* ضرب ضمنی کامل */
      .replace(/(\d)([a-zA-Z(])/g, "$1*$2")
      .replace(/([a-zA-Z)])(\d)/g, "$1*$2")

      /* توابع ریاضی */
      .replace(/sqrt/g, "Math.sqrt")
      .replace(/cbrt/g, "Math.cbrt")
      .replace(/pow/g, "Math.pow")
      .replace(/abs/g, "Math.abs")

      /* مثلثاتی درجه */
      .replace(/sin/g, "sinDeg")
      .replace(/cos/g, "cosDeg")
      .replace(/tan/g, "tanDeg")

      /* لگاریتم */
      .replace(/log10/g, "Math.log10")
      .replace(/log/g, "Math.log")

      /* سایر */
      .replace(/factorial/g, "factorial")
      .replace(/gcd/g, "gcd")
      .replace(/lcm/g, "lcm")
      .replace(/mean/g, "mean")
      .replace(/variance/g, "variance")



    let result = eval(replaced);

    document.getElementById("trigResult").textContent =
      "نتیجه: " + result;

  } catch {
    document.getElementById("trigResult").textContent =
      "❌ فرمول اشتباه!";
  }
}

function factorial(n) {
  if (n < 0) return NaN;
  let r = 1;
  for (let i = 1; i <= n; i++) r *= i;
  return r;
}

function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return Math.abs(a);
}

function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

function mean(...nums) {
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}



// نمودار ساده
function drawChart() {
  let data = document.getElementById("chartList").value.split(",").map(Number).filter(n => !isNaN(n));
  const ctx = document.getElementById("chartCanvas").getContext('2d');
  if (window.myChart) window.myChart.destroy();
  window.myChart = new Chart(ctx, { type: 'line', data: { labels: data.map((v, i) => i + 1), datasets: [{ label: 'اعداد', data: data, backgroundColor: '#2ecc71', borderColor: '#27ae60', fill: false }] } });
}
// تابع واریانس نمونه
function variance(...nums) {
  nums = nums.map(Number).filter(n => !isNaN(n));
  if (nums.length < 2) return "لیست معتبر نیست یا کمتر از دو عدد است";
  let mean = nums.reduce((a, b) => a + b, 0) / nums.length;
  let varSample = nums.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (nums.length - 1);
  return varSample;
}
let displayExp = "";
let calcExp = "";

function updateDisplay() {
  document.getElementById("calc-display").textContent = displayExp || "0";
}

/* دکمه‌های عددی */
function pressNum(n) {
  displayExp += n;
  calcExp += n;
  updateDisplay();
}
let display = document.getElementById('calc-display');
let expression = '';

// وارد کردن اعداد و عملیات
function press(val) {
  expression += val;
  display.innerText = expression;
}

// وارد کردن توابع مثلثاتی و علمی
function pressFunc(func) {
  expression += func;
  display.innerText = expression;
}

// پاک کردن کامل
function clearCalc() {
  expression = '';
  display.innerText = '0';
}

// حذف آخرین کاراکتر
function backspace() {
  expression = expression.slice(0, -1);
  display.innerText = expression || '0';
}

// اضافه کردن کسر بصری
function pressFrac() {
  expression += '()/()';
  display.innerText = expression;
}

// محاسبه و حل معادله با Algebrite و Math.js
function calculate() {
  try {
    // جایگزینی نماد × و ÷ با * و /
    let expr = expression.replace(/×/g, '*').replace(/÷/g, '/');

    // محاسبه عددی با math.js
    let numericResult = math.evaluate(expr);

    // محاسبه نمادین با Algebrite
    let symbolicResult = Algebrite.run(expr);

    // نمایش نتیجه ترکیبی
    display.innerText = `${numericResult} (≈ ${symbolicResult})`;
    expression = numericResult.toString();
  } catch (err) {
    display.innerText = 'خطا';
    expression = '';
  }
}

/* عملگرها */
function pressOp(op) {
  const map = {
    "+": "+",
    "−": "-",
    "×": "*",
    "÷": "/"
  };
  displayExp += op;
  calcExp += map[op];
  updateDisplay();
}

/* رادیکال مثل گوشی */
function pressSqrt() {
  displayExp += "√(";
  calcExp += "Math.sqrt(";
  updateDisplay();
}

/* توان */
function pressPow() {
  displayExp += "^";
  calcExp += "**";
  updateDisplay();
}

/* پرانتز */
function pressParen(p) {
  displayExp += p;
  calcExp += p;
  updateDisplay();
}

/* پاک کردن */
function clearCalc() {
  displayExp = "";
  calcExp = "";
  updateDisplay();
}

/* بک‌اسپیس */
function backspace() {
  displayExp = displayExp.slice(0, -1);
  calcExp = calcExp.slice(0, -1);
  updateDisplay();
}

/* مساوی */
function calculate() {
  try {
    let result = eval(calcExp);
    displayExp = result.toString();
    calcExp = result.toString();
    updateDisplay();
  } catch {
    displayExp = "خطا";
    calcExp = "";
    updateDisplay();
  }
}


/* ============================
   CHARTS
============================ */

let chartInstance = null;

function getChartData() {
  const data = document
    .getElementById("chartList")
    .value
    .split(",")
    .map(n => Number(n.trim()))
    .filter(n => !isNaN(n));

  return data;
}

function destroyChart() {
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
}

/* ---------- Bar Chart ---------- */
function drawBarChart() {
  const data = getChartData();
  if (!data.length) return;

  destroyChart();

  chartInstance = new Chart(chartCanvas, {
    type: "bar",
    data: {
      labels: data.map((_, i) => `داده ${i + 1}`),
      datasets: [{
        label: "مقادیر",
        data,
        backgroundColor: "#34d399"
      }]
    },
    options: chartOptions()
  });
}

/* ---------- Line Chart ---------- */
function drawLineChart() {
  const data = getChartData();
  if (!data.length) return;

  destroyChart();

  chartInstance = new Chart(chartCanvas, {
    type: "line",
    data: {
      labels: data.map((_, i) => `نقطه ${i + 1}`),
      datasets: [{
        label: "روند تغییر",
        data,
        borderColor: "#60a5fa",
        backgroundColor: "rgba(96,165,250,0.2)",
        tension: 0.4,
        fill: true
      }]
    },
    options: chartOptions()
  });
}

/* ---------- Pie Chart ---------- */
function drawPieChart() {
  const data = getChartData();
  if (!data.length) return;

  destroyChart();

  chartInstance = new Chart(chartCanvas, {
    type: "pie",
    data: {
      labels: data.map((_, i) => `بخش ${i + 1}`),
      datasets: [{
        data,
        backgroundColor: [
          "#34d399",
          "#60a5fa",
          "#fbbf24",
          "#f87171",
          "#a78bfa",
          "#22d3ee"
        ]
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: "#e5e7eb",
            font: { family: "Vazirmatn" }
          }
        }
      }
    }
  });
}

/* ---------- Shared Options ---------- */
function chartOptions() {
  return {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#e5e7eb",
          font: { family: "Vazirmatn" }
        }
      }
    },
    scales: {
      x: {
        ticks: { color: "#cbd5f5" },
        grid: { color: "#334155" }
      },
      y: {
        ticks: { color: "#cbd5f5" },
        grid: { color: "#334155" }
      }
    }
  };
}
/* ============================
   GEOMETRY UI
============================ */
/* ============================
   GEOMETRY CALCULATOR - COMPLETE
============================ */

let currentGeo = null;

// --- نقشه تمام اشکال و ورودی‌ها ---
const geoMap = {
  // Areas (مساحت‌ها)
  squareArea: ["طول ضلع"],                   // مربع
  rectArea: ["طول", "عرض"],                  // مستطیل
  circleArea: ["شعاع"],                      // دایره
  triangleArea: ["قاعده", "ارتفاع"],         // مثلث
  trapezoidArea: ["قاعده اول", "قاعده دوم", "ارتفاع"], // ذوزنقه
  parallelogramArea: ["قاعده", "ارتفاع"],    // متوازی‌الاضلاع
  rhombusArea: ["قطر اول", "قطر دوم"],      // لوزی
  ellipseArea: ["نیم‌محور بزرگ", "نیم‌محور کوچک"], // بیضی

  // Volumes (حجم‌ها)
  squareVol: ["طول ضلع"],                    // مکعب
  rectPrismVol: ["طول", "عرض", "ارتفاع"],   // مکعب مستطیل
  cylinderVol: ["شعاع", "ارتفاع"],          // استوانه
  coneVol: ["شعاع", "ارتفاع"],              // مخروط
  sphereVol: ["شعاع"],                       // کره
  hemisphereVol: ["شعاع"],                   // نیم کره
  pyramidVol: ["مساحت قاعده", "ارتفاع"]     // هرم
};

/* ---------- انتخاب شکل و ساخت فرم ---------- */
function selectGeo(type) {
  currentGeo = type;
  const inputs = document.getElementById("geo-inputs");
  inputs.innerHTML = "";
  document.getElementById("geo-form").classList.remove("hidden");

  geoMap[type].forEach((label, i) => {
    inputs.innerHTML += `
      <input id="geo${i}" type="number" step="any" placeholder="${label}">
    `;
  });

  document.getElementById("geoResult").textContent = "";
}

/* ---------- محاسبه بر اساس فرم ---------- */
function calcGeo() {
  const v = i => Number(document.getElementById("geo" + i)?.value || 0);
  let r = 0;

  switch (currentGeo) {
    // --- Areas ---
    case "squareArea": r = v(0) ** 2; break;
    case "rectArea": r = v(0) * v(1); break;
    case "circleArea": r = Math.PI * v(0) ** 2; break;
    case "triangleArea": r = (v(0) * v(1)) / 2; break;
    case "trapezoidArea": r = ((v(0) + v(1)) * v(2)) / 2; break;
    case "parallelogramArea": r = v(0) * v(1); break;
    case "rhombusArea": r = (v(0) * v(1)) / 2; break;
    case "ellipseArea": r = Math.PI * v(0) * v(1); break;

    // --- Volumes ---
    case "squareVol": r = v(0) ** 3; break;
    case "rectPrismVol": r = v(0) * v(1) * v(2); break;
    case "cylinderVol": r = Math.PI * v(0) ** 2 * v(1); break;
    case "coneVol": r = (Math.PI * v(0) ** 2 * v(1)) / 3; break;
    case "sphereVol": r = (4 / 3) * Math.PI * v(0) ** 3; break;
    case "hemisphereVol": r = (2 / 3) * Math.PI * v(0) ** 3; break;
    case "pyramidVol": r = (v(0) * v(1)) / 3; break;
  }

  document.getElementById("geoResult").textContent = `نتیجه: ${r.toFixed(3)}`;
}

/* ---------- محاسبه با فرمول دستی (geoInput) ---------- */
function calcGeometry() {
  let expr = document.getElementById("geoInput").value;

  try {
    let replaced = expr
      // --- Areas ---
      .replace(/squareArea\(([\d.]+)\)/g, (_, a) => a * a)
      .replace(/rectArea\(([\d.]+),([\d.]+)\)/g, (_, a, b) => a * b)
      .replace(/circleArea\(([\d.]+)\)/g, (_, r) => Math.PI * r * r)
      .replace(/triangleArea\(([\d.]+),([\d.]+)\)/g, (_, b, h) => (b * h) / 2)
      .replace(/trapezoidArea\(([\d.]+),([\d.]+),([\d.]+)\)/g,
        (_, a, b, h) => ((+a + +b) * h) / 2)
      .replace(/parallelogramArea\(([\d.]+),([\d.]+)\)/g,
        (_, b, h) => b * h)
      .replace(/rhombusArea\(([\d.]+),([\d.]+)\)/g,
        (_, d1, d2) => (d1 * d2) / 2)
      .replace(/ellipseArea\(([\d.]+),([\d.]+)\)/g,
        (_, a, b) => Math.PI * a * b)

      // --- Volumes ---
      .replace(/squareVol\(([\d.]+)\)/g, (_, a) => a ** 3)
      .replace(/rectPrismVol\(([\d.]+),([\d.]+),([\d.]+)\)/g,
        (_, a, b, h) => a * b * h)
      .replace(/cylinderVol\(([\d.]+),([\d.]+)\)/g,
        (_, r, h) => Math.PI * r * r * h)
      .replace(/coneVol\(([\d.]+),([\d.]+)\)/g,
        (_, r, h) => (Math.PI * r * r * h) / 3)
      .replace(/sphereVol\(([\d.]+)\)/g,
        (_, r) => (4 / 3) * Math.PI * r ** 3)
      .replace(/hemisphereVol\(([\d.]+)\)/g,
        (_, r) => (2 / 3) * Math.PI * r ** 3)
      .replace(/pyramidVol\(([\d.]+),([\d.]+)\)/g,
        (_, base, h) => (base * h) / 3);

    let result = eval(replaced);

    document.getElementById("geoResult").textContent =
      "نتیجه: " + result.toFixed(3);

  } catch {
    document.getElementById("geoResult").textContent =
      "❌ فرمول هندسه اشتباه است";
  }
}




async function solveAIWithServer() {
  const input = document.getElementById("aiInput").value;
  const output = document.getElementById("aiOutput");

  if (!input.trim()) {
    output.innerHTML = "❗ لطفاً یک سوال وارد کنید";
    return;
  }

  output.innerHTML = "⏳ در حال تحلیل سوال...";

  try {
    const response = await fetch("/api/solve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question: input })
    });

    const data = await response.json();
    output.innerText = data.answer;
  } catch (err) {
    output.innerHTML = "❌ خطا در ارتباط با سرور";
  }
}







