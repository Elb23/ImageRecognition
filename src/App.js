import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';
import ParticlesBg from 'particles-bg';






///////////////////////////////////////////////////////////////////////////////////////////////////
// In this section, we set the user authentication, user and app ID, model details, and the URL
// of the image we want as an input. Change these strings to run your own example.
//////////////////////////////////////////////////////////////////////////////////////////////////

const returnClarifaiRequestOptions = (imageUrl) => { //it'll return us request options function

  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = 'f05afafddbb44b7592efa64163414f52';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'elb_23';       
  const APP_ID = 'brain';
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'face-detection';
  const IMAGE_URL = imageUrl;

    
  ///////////////////////////////////////////////////////////////////////////////////
  // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
  ///////////////////////////////////////////////////////////////////////////////////

    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
    });
    
      const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
      };

      return requestOptions
        
    } 

  class App extends Component {
    constructor() {
      super();
      this.state = {
        input: '',
        imageUrl: '',
        box:{},
        route:'signin',
        isSignedIn: false
      }
    }
    calculateFaceLocation = (data) => {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);

        return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - (clarifaiFace.right_col * width),
          bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    }
      displayFaceBox = (box) => {
          this.setState({box: box});
        }

      onInputChange = (event) => {
        this.setState({input: event.target.value})
      }
      
      onButtonSubmit = () => {
            this.setState({imageUrl: this.state.input})
            fetch("https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs", returnClarifaiRequestOptions(this.state.input)) // worth trying the "general-image-recognition" to explore a different model.
            .then(response => response.json())
            .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
            .catch(err => console.log(err));
              }
      
    onRouteChange = (route) => {
      this.setState({route: route });
      if(route ==='signin'){
        this.setState({isSignedIn: 'true'})
      }
      else if (route==='signout'){
        this.setState({isSignedIn: 'false'})
      }
    }

    render(){
      const {isSignedIn, imageUrl, route, box } = this.state;
          return (
            <div className="App">
              <ParticlesBg type="tadpole" color="green" bg={true} />
              <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} /> 
              {this.state.route === 'home' 
                ? <div>
                  <Logo />
                  <Rank />
                  <ImageLinkForm 
                      onInputChange={this.onInputChange}
                      onButtonSubmit={this.onButtonSubmit} />
                  <FaceRecognition box={box} imageUrl={imageUrl}/>
                  </div>
                  : ( route ==='signin'
                      ? <Signin onRouteChange={this.onRouteChange} />
                      : < Register onRouteChange={this.onRouteChange} />)
               }
              </div>
             ) }
          
      }
      
 

export default App;
