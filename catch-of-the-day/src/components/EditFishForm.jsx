import React from 'react'

export default class EditFishForm extends React.Component {
  handleChange = event => {
    console.log(event.currentTarget.value)
    //update fish
    const updatedFish = {
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value
    }
    console.log(updatedFish)
    this.props.updateFish(this.props.index, updatedFish)
  }

  render() {
    return (
      <div className="fish-edit">
        <input
          type="text"
          onChange={this.handleChange}
          value={this.props.fish.name}
          name="name"
          placeholder="Name"
        />
        <input
          type="text"
          onChange={this.handleChange}
          value={this.props.fish.price}
          name="price"
          placeholder="Price"
        />
        <select
          onChange={this.handleChange}
          value={this.props.fish.status}
          name="status"
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>

        <textarea
          onChange={this.handleChange}
          value={this.props.fish.desc}
          name="desc"
          placeholder="Desc"
        />
        <input
          type="text"
          onChange={this.handleChange}
          value={this.props.fish.image}
          name="image"
          placeholder="Image"
        />
        <button onClick={()=> this.props.deleteFish(this.props.index)}>Remove Fish</button>
      </div>
    )
  }
}
