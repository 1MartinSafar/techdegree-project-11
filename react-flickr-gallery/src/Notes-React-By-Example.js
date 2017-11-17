// import PropTypes from 'prop-types';
// const GuestList = props =>
// {props.guests.map((guest, index) =>
// <li key={index}>
// <span>{guest.name}</span>
// )}
// {props.guests.map((guest, index) =>
// <ul>
//    {props.guests.map((guest, index) =>
//      <Guest key={index} name={guest.name} isConfirmed={guest.isConfirmed} />
//    )}
// </ul>;
// GuestList.propTypes = {
//   guests: PropTypes.array.isRequired
// };
// export default GuestList;

// <GuestList guests={this.state.guests} />

// + What property does React use to help identify which items have changed,
// are added, or are removed?
// => key


=> in App.js
toggleConfirmationAt = indexToChange =>
  this.setState({
    guests: this.state.guests.map((guest, index) => {
      if (index === indexToChange) {
        return {
          ...guest,
          isConfirmed: !guest.isConfirmed
        };
      }
      return guest;
    })
  });

// in App.js application part
<GuestList
  guests={this.state.guests}
  toggleConfirmationAt={this.toggleConfirmationAt}
  toggleEditingAt={this.toggleEditingAt}
  setNameAt={this.setNameAt}
  isFiltered={this.state.isFiltered}
/>

const GuestList = props =>
  <ul>
     {props.guests.map((guest, index) =>
       <Guest
        key={index}
        name={guest.name}
        isConfirmed={guest.isConfirmed}
        isEditing={guest.isEditing}
        handleConfirmation={() => props.toggleConfirmationAt(index)}
        handleConfirmation={(event) => props.toggleConfirmationAt(index)}
        handleToggleEditing={() => props.toggleEditingAt(index)}
        setName={text => props.setNameAt(text, index)} />
     )}
  </ul>;

  <li>
    <input
      type="checkbox"
      checked={props.isConfirmed}
      onChange={props.handleConfirmation} />
      <button onClick={props.handleToggleEditing}>edit</button>
  </li>;

GuestList.propTypes = {
  guests: PropTypes.array.isRequired,
  toggleConfirmationAt: PropTypes.func.isRequired,
  toggleEditingAt: PropTypes.func.isRequired,
  setNameAt: PropTypes.func.isRequired,
  isFiltered: PropTypes.bool.isRequired,
  removeGuestAt: PropTypes.func.isRequired
};

toggleGuestPropertyAt = (property, indexToChange) =>
  this.setState({
    guests: this.state.guests.map((guest, index) => {
      if (index === indexToChange) {
        return {
          ...guest,
          [property]: !guest[property]
        };
      }
      return guest;
    })
  });

toggleConfirmationAt = index =>
  this.toggleGuestPropertyAt("isConfirmed", index);

toggleEditingAt = index =>
  this.toggleGuestPropertyAt("isEditing", index);

const GuestName = props => {
  if (props.isEditing) {
    return (
      <input
        type="text"
        value={props.children}
        onChange={props.handleNameEdits} />
    );
  }
  return (
    <span>
      {props.children}
    </span>
  );
};

GuestName.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  handleNameEdits: PropTypes.func.isRequired
};

=> in Guest.js

const Guest = props =>
  <li>
    <GuestName
    isEditing={props.isEditing}
    handleNameEdits={e => props.setName(e.target.value)}>
    {props.name}
    </GuestName>
    <input
      type="checkbox"
      checked={props.isConfirmed}
      onChange={props.handleConfirmation} />
      <button onClick={props.handleToggleEditing}>
        {props.isEditing ? "save" : "edit"}
      </button>


setNameAt = (name, indexToChange) =>
  this.setState({
    guests: this.state.guests.map((guest, index) => {
      if (index === indexToChange) {
        return {
          ...guest,
          name
        };
      }
      return guest;
    })
  });

// Filtering guests

state = {
  isFiltered: false,
  pendingGuest: "",
  guests: [
    {
      name: 'Treasure',
      isConfirmed: false,
      isEditing: false
    },
  ]
}

// * Now, I´ll write a handler to set this property on the state.
// And this will be easier than the other handlers we've written because
// we won't need to hunt through the guest array.
// We just have one value to worry about, it's filtered.

toggleFilter = () =>
  this.setState({ isFiltered: !this.state.isFiltered });

// in App.js
<input
  type="checkbox"
  onChange={this.toggleFilter}
  checked={this.state.isFiltered} /> // Hide those who haven't responded

// in App.js application part
<GuestList
  guests={this.state.guests}
  toggleConfirmationAt={this.toggleConfirmationAt}
  toggleEditingAt={this.toggleEditingAt}
  setNameAt={this.setNameAt}
  isFiltered={this.state.isFiltered}
/>

const GuestList = props =>
  <ul>
     {props.guests
       .filter(guest => !props.isFiltered || guest.isConfirmed)
       .map((guest, index) =>
       <Guest
        key={index}
        name={guest.name}
        isConfirmed={guest.isConfirmed}
        isEditing={guest.isEditing}
        handleConfirmation={() => props.toggleConfirmationAt(index)}
        handleConfirmation={(event) => props.toggleConfirmationAt(index)}
        handleToggleEditing={() => props.toggleEditingAt(index)}
        setName={text => props.setNameAt(text, index)}
        handleRemove={() => props.removeGuestAt(index)} />
     )}
  </ul>;

  <li>
    <input
      type="checkbox"
      checked={props.isConfirmed}
      onChange={props.handleConfirmation} />
      <button onClick={props.handleToggleEditing}>edit</button>
  </li>;

// When a user clicks the "edit" button, how is our app
// finding the corresponding array element in the state?
// => the handler has been given the array element’s index through a closure.

// What is one way to create a copy of an array while removing some of its elements?
// => the filter() method on JavaScript arrays.

handleNameInput = e =>
  this.setState({ pendingGuest: e.target.value });

// in App.js
render () {
  return (
    // stuff
    <form onSubmit={this.newGuestSubmitHandler}>
    <input
      type="text"
      onChange={this.handleNameInput}
      value={this.state.pendingGuest}
      placeholder="Invite someone" />
    <button type="submit" name="submit" value="submit">Submit</button>
    </form>
    //stuff
    <input
      type="checkbox"
      onChange={this.toggleFilter}
      checked={this.state.isFiltered} /> // Hide those who haven't responded
  )
}

newGuestSubmitHandler = e => {
  e.preventDefault();
  this.setState({
    guests: [
      {
        name: this.state.pendingGuest,
        isConfirmed: false,
        isEditing: false
      },
      ...this.state.guests
    ],
    pendingGuest: ''
  });
}

// Removing Guests
removeGuestAt = index =>
  this.setState({
    guests: [
      ...this.state.guests.slice(0, index),
      ...this.state.guests.slice(index + 1)
    ]
  });

  // in App.js application part
  <GuestList
    guests={this.state.guests}
    toggleConfirmationAt={this.toggleConfirmationAt}
    toggleEditingAt={this.toggleEditingAt}
    setNameAt={this.setNameAt}
    isFiltered={this.state.isFiltered}
    removeGuestAt={this.removeGuestAt}
  />












//
