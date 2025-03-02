import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'


export default function Home() {
  const [search, setsearch] = useState("");
  const [foodcat, setfoodcat] = useState([]);//.map funtion only used in array funtion
  const [fooditem, setfooditem] = useState([]);


  const loaddata = async () => {
    let response = await fetch("http://localhost:5000/api/fooddata", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();
    // console.log(response[0],response[1]);
    setfooditem(response[0]);
    setfoodcat(response[1]);

  }

  useEffect(() => {
    loaddata()
  }, []);

  return (
    <div>
      <div> <Navbar /> </div>

      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div class="d-flex justify-content-center">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setsearch(e.target.value)} />
              {/* <button class="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
            </div>
          </div>
          <div className="carousel-item active">
            <img src="https://picsum.photos/200?burger" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://picsum.photos/200?momos" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://picsum.photos/200?sea" className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className='container'>
        {
          foodcat && foodcat.length > 0
            ? foodcat.map((data) => {
              return (
                <div className='row mb-3'>
                  <div key={data._id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr />
                  {
                    fooditem && fooditem.length > 0
                      ? fooditem.filter((item) =>
                        (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search))
                      )
                        .map((filteritems) => {
                          return (
                            <div key={filteritems._id} className="col-12 col-md-6 col-lg-3">
                              {/* <Card fooditem={filteritems}
                                options={filteritems.options[0]}
                              > */}
                            <Card  foodName={filteritems.name} item={filteritems} options={filteritems.options[0]} ImgSrc={filteritems.img}  >
                              </Card>
                            </div>
                          )
                        })
                      : <div>No data found</div>
                  }
                </div>
              )
            })
            : ""
        }
      </div>

      <div><Footer /></div>
    </div>
  )
}
