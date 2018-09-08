import React, { Component } from 'react';

import * as firebase from 'firebase';

import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';

import Upload from 'react-icons/lib/fa/upload';
import Floppy from 'react-icons/lib/fa/floppy-o';

import { Grid, Col, Row } from 'react-styled-flexboxgrid';

const languageOptions = [];

const languages = {
    "AF":"Afrikanns",
    "SQ":"Albanian",
    "AR":"Arabic",
    "HY":"Armenian",
    "EU":"Basque",
    "BN":"Bengali",
    "BG":"Bulgarian",
    "CA":"Catalan",
    "KM":"Cambodian",
    "ZH":"Chinese (Mandarin)",
    "HR":"Croation",
    "CS":"Czech",
    "DA":"Danish",
    "NL":"Dutch",
    "EN":"English",
    "ET":"Estonian",
    "FJ":"Fiji",
    "FI":"Finnish",
    "FR":"French",
    "KA":"Georgian",
    "DE":"German",
    "EL":"Greek",
    "GU":"Gujarati",
    "HE":"Hebrew",
    "HI":"Hindi",
    "HU":"Hungarian",
    "IS":"Icelandic",
    "ID":"Indonesian",
    "GA":"Irish",
    "IT":"Italian",
    "JA":"Japanese",
    "JW":"Javanese",
    "KO":"Korean",
    "LA":"Latin",
    "LV":"Latvian",
    "LT":"Lithuanian",
    "MK":"Macedonian",
    "MS":"Malay",
    "ML":"Malayalam",
    "MT":"Maltese",
    "MI":"Maori",
    "MR":"Marathi",
    "MN":"Mongolian",
    "NE":"Nepali",
    "NO":"Norwegian",
    "FA":"Persian",
    "PL":"Polish",
    "PT":"Portuguese",
    "PA":"Punjabi",
    "QU":"Quechua",
    "RO":"Romanian",
    "RU":"Russian",
    "SM":"Samoan",
    "SR":"Serbian",
    "SK":"Slovak",
    "SL":"Slovenian",
    "ES":"Spanish",
    "SW":"Swahili",
    "SV":"Swedish",
    "TA":"Tamil",
    "TT":"Tatar",
    "TE":"Telugu",
    "TH":"Thai",
    "BO":"Tibetan",
    "TO":"Tonga",
    "TR":"Turkish",
    "UK":"Ukranian",
    "UR":"Urdu",
    "UZ":"Uzbek",
    "VI":"Vietnamese",
    "CY":"Welsh",
    "XH":"Xhosa"
}

for (var lang in languages) {
  languageOptions.push(<MenuItem value={lang}  primaryText={`${languages[lang]}`} />);
}

class NewRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: firebase.auth().currentUser,
      request: '',
      language: 'EN',
      difficulty: 0.5,
      toastOpen: false,
      toastMessage: '',
    };
  }

  handleLangChang = (event, index, language) => {
    this.setState({language});
  };

  componentWillMount() {
    this.authListener = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
      } else {
        this.setState({ user });
        const profileRef = firebase.database().ref(`users/${this.state.user.uid}/profile`);

               profileRef.once('value', (snapshot) => {
                 const profile = snapshot.val();

                 firebase.storage().ref('user-dps').child(`${this.state.user.uid}.jpg`).getDownloadURL()
                   .then((url) => {
                     this.setState({
                       name: profile.name,
                       image: url,
                     });
                   });
               });

      }
    });
  }

  componentWillUnmount() {
    this.authListener = undefined;
  }

  addRequest() {
    let ok = true;
    // Check values
    if (!this.state.request) {
      ok = false;
      this.setState({ toastMessage: 'Request field cannot be blank.' });
      this.setState({ toastOpen: true });
    }

    // Perform save
    if (ok) {
      const requestsRef = firebase.database().ref(`/requests/${this.state.language}`);
      var req = requestsRef.push({
        user: this.state.user.uid,
        request: this.state.request,
        difficulty: this.state.difficulty,
      }).then((snap) => {
        var newId = snap.key;

        const usersRef = firebase.database().ref(`/users/${this.state.user.uid}/requests/`);
        usersRef.push({
          id: newId,
          lang: this.state.language,
        });
        this.setState({ toastMessage: 'Successfully made request!' });
        this.setState({ toastOpen: true });
      });
    }
  }

  render() {
    return (
      <div className="new-request">
        <Paper className="new-request-container" zDepth={1}>
          <Row>
            <div className="pprofile-pic-container">
              <div className="pprofile-image-container">
                <img className="pprofile-image" src={this.state.image} alt="profile" />
              </div>
            </div>
            <div className="vertical-center">{this.state.name}</div>
          </Row>
          <Row>
            <TextField
              hintText="What is your request?"
              multiLine
              value={this.state.request}
              style={{fontSize: 25}}
              className="new-request-input"
              fullWidth
              onChange={(e, val) => { this.setState({ request: val }); }}
            />
          </Row>
          <span style={{color: 'grey', position: 'relative', top: 15}}> Request difficulty</span>
          <Slider
            step={0.10}
            value={this.state.difficulty}
            onChange={ (e, val) => this.setState({difficulty: val}) }
          />
          <Row>
            <Col>
              <SelectField
                value={this.state.language}
                onChange={this.handleLangChang}
                maxHeight={200}
              >
                {languageOptions}
              </SelectField>
            </Col>
            <Col>
              <RaisedButton
                label="REQUEST"
                disabled={this.state.name === ''}
                onClick={() => this.addRequest()}
              />
            </Col>
          </Row>
        </Paper>
        <Snackbar
          open={this.state.toastOpen}
          message={this.state.toastMessage}
          autoHideDuration={1000}
          onRequestClose={() => this.setState({ toastOpen: false })}
        />
      </div>
    );
  }
}

export default NewRequest;
