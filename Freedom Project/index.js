// // import resources from './resources.js'


// // Black Screen Test
// me.device.onReady(function () {
//     // initialize the display canvas once the device/browser is ready
//     if (!me.video.init(1218, 562, {parent : "screen", scale : "auto"})) {
//         alert("Your browser does not support HTML5 canvas.");
//         return;
//     }
//     me.loader.load({ name : "tileset.png", type: "image",    src:"map/tileset.png"})
//     me.loader.load({ name : "0-1",   type: "tmx",   src:"map/0-1.tmx"})
//     // me.game.world.addChild(new me.ColorLayer("background", "#202020"));
// });


var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = 1920
canvas.height = 1080

c.fillRect(0, 0, canvas.width, canvas.height)

var gravity = 0.05

class Sprite {
    constructor({position,velocity}){
        this.position = position
        this.velocity = velocity
        this.height = 150
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    update(){
        this.draw()
        //moves the sprites by adding the velocity value to the position
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        // if the sprite hits the bottom of the canvas, stop it from falling (constrain)
        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        }
        else {
            this.velocity.y += gravity
        }
    }
}

//amiya
var amiya = new Sprite({
    position:{
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})



//reunion enemy
var reunion = new Sprite({
    position:{
        x: 400,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})


var key = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }

}

//defines the last key that was pressed so if both were pressed down, it will move depending on the last one pressed
var lastPressed

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    amiya.update()
    reunion.update()

    amiya.velocity.x = 0

    //when a or d is pressed, move left or right
    if(key.a.pressed && lastPressed === 'a'){
        amiya.velocity.x = -0.5
    }
    else if(key.d.pressed && lastPressed === 'd'){
        amiya.velocity.x = 0.5
    }

}
animate()

//if a key is pressed, movement is true
window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'd':
            key.d.pressed = true
            lastPressed = 'd'
            break
        case 'a':
            key.a.pressed = true
            lastPressed = 'a'
            break
        case ' ':
            amiya.velocity.y = -5
            break
    }
    console.log(event.key);
})

//hen a key is lifted, movement is false and stop moving
window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'd':
            key.d.pressed = false
            break
        case 'a':
            key.a.pressed = false
            break
    }
    console.log(event.key);
})

