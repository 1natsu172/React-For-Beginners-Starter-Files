import React from 'react'
import AddFishForm from './AddFishForm'
import EditFishForm from './EditFishForm'
import Login from './Login'
import base, { firebaseApp } from '../base'
import Firebase from 'firebase'

export default class Inventory extends React.Component {
  state = {
    uid: null,
    owner: null
  }

  componentDidMount() {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user })
      }
    })
  }

  authHandler = async authData => {
    // fetch current store database
    const store = await base.fetch(this.props.storeId, { contect: this })
    // if no owner, setting data
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      })
    }
    // Set the state of inventory current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    })
  }

  authenticate = async provider => {
    const authProvider = new Firebase.auth[`${provider}AuthProvider`]()
    const authData = await firebaseApp.auth().signInWithPopup(authProvider)
    await this.authHandler(authData)
  }

  logout = async () => {
    await Firebase.auth().signOut()
    this.setState({ uid: null })
  }

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>

    // check already logged in?
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />
    }
    // check is user owener?
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you're not the owner!</p>
          {logout}
        </div>
      )
    }
    // if the owner, just render the inventory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    )
  }
}
