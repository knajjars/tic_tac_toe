import PropTypes from 'prop-types';
import React, { useState } from 'react';

const Menu = (props) => {
  const [name, setName] = useState(props.name);

  return (
    <div>
      <h3>Hello, {name}!</h3>
      <hr />
      <form>
        <label htmlFor="name">
          Enter your name
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </form>
    </div>
  );
};

Menu.propTypes = {
  name: PropTypes.string.isRequired, // this is passed from the Rails view
};

export default Menu;
