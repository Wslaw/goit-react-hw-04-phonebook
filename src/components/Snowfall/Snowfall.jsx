import React, { Component } from 'react';
import styles from './snowfall.module.css'; 

class Snowfall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flakes: [],
    };
  }

  componentDidMount() {
    this.createSnowflakes();
    this.animateSnowfall();
  }

  createSnowflakes() {
    const flakes = [];
    for (let i = 0; i < 250; i++) {
      flakes.push({
        id: i,
        left: Math.random() * window.innerWidth,
        top: Math.random() * window.innerHeight,
        speed: Math.random() * 2 + 1,
        size: Math.random() * 3 + 1,
      });
    }
    this.setState({ flakes });
  }

  animateSnowfall() {
  const animate = () => {
    this.setState((prevState) => ({
      flakes: prevState.flakes.map((flake) => ({
        ...flake,
        top: flake.top + flake.speed >= window.innerHeight ? 0 : flake.top + flake.speed,
      })),
    }));
    requestAnimationFrame(animate);
  };

  animate();
}


  render() {
    const { flakes } = this.state;
    return (
      <div className={styles.snowfallContainer}>
        {flakes.map(flake => (
          <div
            key={flake.id}
            className={styles.flake}
            style={{
              left: `${flake.left}px`,
              top: `${flake.top}px`,
              width: `${flake.size}px`,
              height: `${flake.size}px`,
            }}
          />
        ))}
      </div>
    );
  }
}

export default Snowfall;
