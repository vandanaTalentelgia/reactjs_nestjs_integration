import React from "react";
import './App.css';
import { BrowserRouter as Router,  Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import PublicLayout from './layouts';
import Register from './components/Register';
import dashboardRoutes from "./routes";
import Layout from "./admin/layouts";
function App() {

  return (
    
    <Router>
       <Routes>
       <Route exact path='/' element={PublicLayout(<Login />)}/>
       <Route exact path='/login' element={PublicLayout(<Login />)}/>
       <Route exact path='/register' element={PublicLayout(<Register />)}/>
       {dashboardRoutes.map((prop, key) => {
            if (prop.layout === "/admin") {
              return (
                <React.Fragment key={key}>
                  {"submenu" in prop ? (
                    <React.Fragment key={key}>
                      {prop.submenu.map((submenu, keys) => {
                        return (

                          <Route
                            exact
                            path={submenu.layout + submenu.path}
                            element={Layout(<submenu.component />)}
                            key={keys}
                          />
                        )
                      })}
                    </React.Fragment>
                  ) : (
                    <Route
                      exact
                      path={prop.layout + prop.path}
                      element={Layout(<prop.component />)}
                      key={key}
                    />
                  )}
                </React.Fragment>
              );
            } else {
              return null;
            }
          }
          )}
      </Routes>
    </Router>
  );
}

export default App;
