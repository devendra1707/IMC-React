import { Route, Routes } from "react-router";
import { HomeComponent } from "./home";
import { LoginComponent } from "./login";
import { RegisterComponent } from "./register";
import { UserComponent } from "./user";
import { AddIncident } from "./addIncident";
import { DeleteComponent } from "./delete";
import { UpdateIncident } from "./update";


export function MainComponent(){
    return(
        <div className="container-fluid">

            <Routes>
                <Route path="/" element={<HomeComponent />} />
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/register" element={<RegisterComponent />} />
                <Route path="/user" element={<UserComponent />}></Route>
                <Route path="/addIncident" element={<AddIncident />}></Route>
                <Route path="/delete/:idDelete" element={<DeleteComponent />}></Route>
                <Route path="/update/incident/:incidentId/:incidentDetails/:reportedDateTime/:priority/:status" element={<UpdateIncident />} />

            </Routes>
               
        </div>
    )
}