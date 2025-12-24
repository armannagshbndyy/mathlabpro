// نمایش بخش‌ها
function showSection(id){
    document.querySelectorAll("section").forEach(s=>s.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
  }
  
  // اعداد اول
  function isPrime(n){
    if(n<2)return false;
    for(let i=2;i<=Math.sqrt(n);i++)if(n%i===0)return false;
    return true;
  }
  function checkPrime(){
    let n=+document.getElementById("primeInput").value;
    document.getElementById("primeResult").textContent = isPrime(n)?"عدد اول ✅":"عدد مرکب ❌";
  }
  function listPrime(){
    let n=+document.getElementById("primeInput").value;
    let arr=[];
    for(let i=2;i<=n;i++)if(isPrime(i))arr.push(i);
    document.getElementById("primeResult").textContent = `(${arr.length}) → `+arr.join(", ");
  }
  function factorPrime(){
    let n=+document.getElementById("primeInput").value;
    let factors=[];
    for(let i=1;i<=n;i++)if(n%i===0)factors.push(i);
    document.getElementById("primeResult").textContent = `شمارنده ها: `+factors.join(", ");
  }
  
  // ماشین حساب پیشرفته
  function calcAdvanced(){
    let expr=document.getElementById("calcInput").value;
    try{
      let result=eval(expr.replace(/\^/g,"**"));
      document.getElementById("calcResult").textContent="نتیجه: "+result;
    }catch{
      document.getElementById("calcResult").textContent="فرمول اشتباه!";
    }
  }
  
  // تحلیل لیست اعداد
  function analyzeList(){
    let nums=document.getElementById("numList").value.split(",").map(Number).filter(n=>!isNaN(n));
    if(!nums.length){document.getElementById("statsResult").textContent="لیست معتبر نیست";return;}
    let max=Math.max(...nums);
    let min=Math.min(...nums);
    let sum=nums.reduce((a,b)=>a+b,0);
    let avg=sum/nums.length;
    document.getElementById("statsResult").textContent=`بیشترین: ${max} | کمترین: ${min} | مجموع: ${sum} | میانگین: ${avg.toFixed(2)}`;
  }
  
  function calcTrig(){
    let expr = document.getElementById("trigInput").value;
    try{
      let replaced = expr
        .replace(/sqrt/g,"Math.sqrt")
        .replace(/cbrt/g,"Math.cbrt")
        .replace(/pow/g,"Math.pow")
        .replace(/abs/g,"Math.abs")
        .replace(/sin/g,"Math.sin")
        .replace(/cos/g,"Math.cos")
        .replace(/tan/g,"Math.tan")
        .replace(/log10/g,"Math.log10")
        .replace(/log/g,"Math.log")
        .replace(/factorial/g,"factorial")
        .replace(/gcd/g,"gcd")
        .replace(/lcm/g,"lcm")
        .replace(/mean/g,"mean")
        .replace(/variance/g,"variance");
  
      let result = eval(replaced);
      document.getElementById("trigResult").textContent = "نتیجه: " + result;
    }catch{
      document.getElementById("trigResult").textContent = "فرمول اشتباه!";
    }
  }
  
  function factorial(n){
    if(n < 0) return NaN;
    let r = 1;
    for(let i = 1; i <= n; i++) r *= i;
    return r;
  }
  
  function gcd(a, b){
    while(b !== 0){
      [a, b] = [b, a % b];
    }
    return Math.abs(a);
  }
  
  function lcm(a, b){
    return Math.abs(a * b) / gcd(a, b);
  }
  
  function mean(...nums){
    return nums.reduce((a,b)=>a+b,0) / nums.length;
  }
  // هندسه
  function calcGeometry(){
    let expr=document.getElementById("geoInput").value;
    try{
      let replaced=expr.replace(/squareArea\((\d+)\)/g,(m,p1)=>Math.pow(RegExp.$1,2))
                       .replace(/rectArea\((\d+),(\d+)\)/g,(m,p1,p2)=>p1*p2)
                       .replace(/circleArea\((\d+)\)/g,(m,r)=>Math.PI*Math.pow(r,2))
                       .replace(/squareVol\((\d+)\)/g,(m,a)=>Math.pow(a,3))
                       .replace(/cylinderVol\((\d+),(\d+)\)/g,(m,r,h)=>Math.PI*Math.pow(r,2)*h)
                       .replace(/sphereVol\((\d+)\)/g,(m,r)=>4/3*Math.PI*Math.pow(r,3));
      let result=eval(replaced);
      document.getElementById("geoResult").textContent="نتیجه: "+result;
    }catch{
      document.getElementById("geoResult").textContent="فرمول هندسه اشتباه!";
    }
  }
  
  // نمودار ساده
  function drawChart(){
    let data=document.getElementById("chartList").value.split(",").map(Number).filter(n=>!isNaN(n));
    const ctx=document.getElementById("chartCanvas").getContext('2d');
    if(window.myChart)window.myChart.destroy();
    window.myChart=new Chart(ctx,{type:'line',data:{labels:data.map((v,i)=>i+1),datasets:[{label:'اعداد',data:data,backgroundColor:'#2ecc71',borderColor:'#27ae60',fill:false}]}});
  }
  // تابع واریانس نمونه
function variance(...nums){
    nums = nums.map(Number).filter(n=>!isNaN(n));
    if(nums.length < 2) return "لیست معتبر نیست یا کمتر از دو عدد است";
    let mean = nums.reduce((a,b)=>a+b,0)/nums.length;
    let varSample = nums.reduce((a,b)=>a + Math.pow(b-mean,2),0)/(nums.length-1);
    return varSample;
  }
  let displayExp = "";
let calcExp = "";

function updateDisplay(){
  document.getElementById("calc-display").textContent = displayExp || "0";
}

/* دکمه‌های عددی */
function pressNum(n){
  displayExp += n;
  calcExp += n;
  updateDisplay();
}

/* عملگرها */
function pressOp(op){
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
function pressSqrt(){
  displayExp += "√(";
  calcExp += "Math.sqrt(";
  updateDisplay();
}

/* توان */
function pressPow(){
  displayExp += "^";
  calcExp += "**";
  updateDisplay();
}

/* پرانتز */
function pressParen(p){
  displayExp += p;
  calcExp += p;
  updateDisplay();
}

/* پاک کردن */
function clearCalc(){
  displayExp = "";
  calcExp = "";
  updateDisplay();
}

/* بک‌اسپیس */
function backspace(){
  displayExp = displayExp.slice(0,-1);
  calcExp = calcExp.slice(0,-1);
  updateDisplay();
}

/* مساوی */
function calculate(){
  try{
    let result = eval(calcExp);
    displayExp = result.toString();
    calcExp = result.toString();
    updateDisplay();
  }catch{
    displayExp = "خطا";
    calcExp = "";
    updateDisplay();
  }
}
