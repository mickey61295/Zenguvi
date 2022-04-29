let countriesinfo = {
    {name:"India",
    population:1.3,
    region:"Asia",
    flag:"https://cdn.britannica.com/97/1597-004-05816F4E/Flag-India.jpg"
    capital:"New Delhi"},
    {name:"China",
    population:1.4,
    region:"Asia",
    flag:"https://cdn.britannica.com/90/7490-004-BAD4AA72/Flag-China.jpg"
    capital:"Beijing"},
    {name:"USA",
    population:1.5,
    region:"North America",
    flag:"https://cdn.britannica.com/97/1597-004-05816F4E/Flag-India.jpg"
    capital:"Washington"},
    {name:"UK",
    population:1.6,
    region:"Europe",
    flag:"https://cdn.britannica.com/97/1597-004-05816F4E/Flag-India.jpg"
    capital:"London"},
    {name:"France",
    population:1.7,
    region:"Europe",
    flag:"https://cdn.britannica.com/97/1597-004-05816F4E/Flag-India.jpg"
    capital:"Paris"}
}

const container = document.createElement("div");
const row = document.createElement("div");

container.setAttribute("class","container-fluid");
row.setAttribute("class","row");

container.append(row);

countriesinfo.forEach((item)=>{
    row.innerHTML += `div class="col-md-6 col-sm-12 col-lg-3 d-flex justify-content-center p-2">
