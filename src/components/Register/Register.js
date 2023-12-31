import React from 'react'


const Register = ({onRouteChange}) => {
    return(
        <article className=" br3 ba mw6 center bg-transparent br3 pa3 pa4-ns mv3 ba b--black-10">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">REGISTER</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">First Name</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="First-name"  id="First-name"/>
                    </div>
                    <div>
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Last Name</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="Last-name"  id="Last-name" />
                    </div>
                    <div>
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Confirm Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="confirm-password"  id="confirm-password"/>
                    </div>
                    </fieldset>
                    <div>
                    <input 
                    onClick= {() => onRouteChange('home')}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type="submit"
                    value="Submit"/>
                    </div>
                </div>
                </main>
        </article>
    );
}

export default Register;