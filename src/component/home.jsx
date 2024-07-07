import { Link } from "react-router-dom";
import "./login.css"

export function HomeComponent() {
    return (
        <div className="backgroundColor" >
        <div className="row d-flex justify-content-center align-items-center vh-100">
            <div className="col-sm-6">
                <div className="card p-4 rounded-5 shadow bg-dark">
                    <h3 className='text-center fw-bold text-white'>Get Batter Delivery For Your <span className='text-info'>Product</span></h3>
                    <div class="accordion" id="accordionExample">
                        <div class="accordion-item">
                            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div class="accordion-body bg-dark text-white rounded-5">
                                <strong className="text-success">Welcome to the World's Best Hospital:</strong> Our hospital is renowned for its exceptional patient care and outstanding medical services. We are dedicated to providing unparalleled healthcare, and our commitment
                                 to excellence is reflected in every aspect of our services. This section highlights our mission to offer world-class medical treatment, supported by a team of compassionate and skilled professionals who prioritize the well-being and comfort of 
                                 every patient. Our state-of-the-art facilities and innovative treatments ensure that we remain at the forefront of medical advancements. Whether you are here for a routine check-up or a complex procedure, you can trust that you are in the best hands.
                                 Join us in experiencing the difference at the world's best hospital, where your health and well-being are our top priority.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <Link to="/login"><button className='btn btn-outline-success' id='loginButton'>Login Here!</button></Link>
                        <Link to="/register"><button className='btn btn-outline-primary' id='registerButton'>Register Here!</button></Link>
                    </div>
                </div>
            </div>
        </div>
    </div >
    );
}
