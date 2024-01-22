import { useEffect, useCallback } from "react";
import Particles from "react-particles";
import { confetti } from "tsparticles-confetti";

export default function Particless() {
    const optionsLoadSlim = {
      background: {
        color: {
          value: "#0d47a1"
        }
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push"
          },
          onHover: {
            enable: true,
            mode: "repulse"
          },
          resize: true
        },
        modes: {
          push: {
            quantity: 4
          },
          repulse: {
            distance: 200,
            duration: 0.4
          }
        }
      },
      particles: {
        color: {
          value: "#ffffff"
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce"
          },
          random: false,
          speed: 6,
          straight: false
        },
        number: {
          density: {
            enable: true,
            area: 800
          },
          value: 80
        },
        opacity: {
          value: 0.5
        },
        shape: {
          type: "circle"
        },
        size: {
          value: { min: 1, max: 5 }
        }
      },
      detectRetina: true
    };    
    const confettiOptions = {
        angle: 90,
        count: 500,
        position: {
            x: 50,
            y: 50,
        },
        spread: 45,
        startVelocity: 45,
        decay: 0.9,
        gravity: 1,
        drift: 0,
        ticks: 200,
        colors: ["#ffffff", "#ff0000"],
        shapes: ["square", "circle", "star", "heart", "spades", "dimonds"],
        scalar: 1,
        zIndex: 100,
        disableForReducedMotion: true,
    };
    const particlesInit = useCallback(async (engine) => {        
        await confetti(engine);
    }, []);
    const particlesLoaded = useCallback(async () => {

    }, []);
    useEffect(() => {
        (async () => {
            await confetti();
        })();
    }, []);

    const handleFunction = () => {        
        (async () => {
            await confetti("tsparticles", confettiOptions);
        })();
    };

    handleFunction()

    return (
        <Particles
            id="tsparticles"
            // url="http://foo.bar/particles.json"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                        },
                    },
                },
                fpsLimit: 120,
                origin: {
                    x: 0.5,
                    y: 0.5,
                },
                //------------------------------------------
                angle: 90,
                count: 500,
                position: {
                    x: 50,
                    y: 50,
                },
                spread: 45,
                startVelocity: 45,
                decay: 0.9,
                gravity: 0.5,
                drift: 0,
                ticks: 200,
                colors: ["#ffffff", "#ff0000"],
                shapes: ["square", "circle", "star", "heart", "clubs", "diamonds"],
                scalar: 1,
                zIndex: 100,
                disableForReducedMotion: true,
            }}
        />
    );
}


