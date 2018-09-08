import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import * as firebase from 'firebase';

import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import Upload from 'react-icons/lib/fa/upload';
import Floppy from 'react-icons/lib/fa/floppy-o';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { Grid, Col, Row } from 'react-styled-flexboxgrid';

import '../css/Profile.css';

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

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: firebase.auth().currentUser,
      name: '',
      language: 'EN',
      languages: [],
      description: '',
      image: '',
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
        this.props.history.push('/');
      } else {
        this.setState({ user });

        const profileRef = firebase.database().ref(`users/${this.state.user.uid}/profile`);

        profileRef.once('value', (snapshot) => {
          const profile = snapshot.val();

          firebase.storage().ref('user-dps').child(`${this.state.user.uid}.jpg`).getDownloadURL()
            .then((url) => {
              this.setState({
                name: profile.name,
                languages: profile.languages,
                description: profile.description,
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

  saveProfile() {
    let ok = true;
    // Check values
    if (this.state.name.length > 100) {
      ok = false;
      this.setState({ toastMessage: 'Dude why is your name so long? Save not successful.' });
      this.setState({ toastOpen: true });
    }

    // Perform save
    if (ok) {
      const profileRef = firebase.database().ref(`users/${this.state.user.uid}/profile`);
      profileRef.set({
        name: this.state.name,
        description: this.state.description,
        languages: this.state.languages,
        image: this.state.image,
      }).then(() => {
        this.setState({ toastMessage: 'Saved!' });
        profileRef.child('languages').push({
          l: this.state.language,
        })
        // Upload file if one was uploaded
        if (this.state.file) {
          const storageRef = firebase.storage().ref('/user-dps/');

          const dpRef = storageRef.child(`${this.state.user.uid}.jpg`);
          dpRef.put(this.state.file).then(() => {
            this.setState({ toastOpen: true });
          });
        } else {
          this.setState({ toastOpen: true });
        }
      });
    }
  }

  handleImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        image: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  render() {
    return (
      <div className="profile">
        <h1>My Profile</h1>
        <Paper className="profile-form-container" zDepth={1}>
          <Grid>
            <Row className="profile-row">
              <Col lg={4}>
                <TextField
                  floatingLabelText="Name or Title"
                  value={this.state.name}
                  errorText={this.state.name ? '' : 'This field is required.'}
                  onChange={(e, val) => { this.setState({ name: val }); }}
                />
                <SelectField
                  value={this.state.language}
                  onChange={this.handleLangChang}
                  maxHeight={200}
                  floatingLabelText="Add a Language"
                >
                {languageOptions}
                </SelectField>
              </Col>
              <Col lg={8} className="profile-pic-container">
                <div className="profile-image-container">
                  <img className="profile-image" src={this.state.image} alt="profile" />
                </div>
                <RaisedButton
                  type="file"
                  icon={<Upload />}
                  label="UPLOAD IMAGE"
                  backgroundColor="#4DD0EA"
                  onClick={() => this.upload.click()}
                />
                <input
                  type="file"
                  ref={(ref) => { this.upload = ref; }}
                  style={{ display: 'none' }}
                  onChange={e => this.handleImageChange(e)}
                />
              </Col>
            </Row>
            <Row className="profile-row">
              <Col lg={12}>
                <TextField
                  floatingLabelText="Description"
                  multiLine
                  value={this.state.description}
                  style={{ width: 500 }}
                  onChange={(e, val) => { this.setState({ description: val }); }}
                />
              </Col>
            </Row>
          </Grid>
        </Paper>
        <RaisedButton
          type="file"
          icon={<Floppy />}
          label="SAVE"
          disabled={this.state.name === ''}
          onClick={() => this.saveProfile()}
        />
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

export default withRouter(Profile);
