import {Link, Route, Switch} from "react-router-dom";
import {ProtectedRoute} from "./screens/auth/auth-screen";
import React from "react";
import {UploadNewImage} from "./screens/alttext/upload-new-image";
import {Dashboard} from "./screens/dashboard/dashboard";

export function Routes() {

    return <Switch>
        {/* Home */}

        <ProtectedRoute
            exact path='/'
            component={Dashboard}
        />

        <ProtectedRoute
            exact path='/alttext'
            component={UploadNewImage}
        />

        <Route path="*">
            <div style={{textAlign: 'center'}}>
                <h3>
                    Couldn't find <code>{window.location.pathname}</code>
                    <br/>
                    Maybe you want to go <Link to="/alttext">home?</Link>
                </h3>
            </div>
        </Route>

    </Switch>
}
