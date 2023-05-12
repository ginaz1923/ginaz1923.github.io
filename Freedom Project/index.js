// // import resources from './resources.js'


// // Black Screen Test
// me.device.onReady(function () {
//     // initialize the display canvas once the device/browser is ready
//     if (!me.video.init(1218, 562, {parent : "screen", scale : "auto"})) {
//         alert("Your browser does not support HTML5 canvas.");
//         return;
//     }
// });


var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = 1600
canvas.height = 930

c.fillRect(0, 0, canvas.width, canvas.height)

var gravity = 0.1

class Sprite {
    constructor({position,velocity, color = 'red'}){
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastPressed

        this.attackRange = {
            position: this.position,
            width: 100,
            height: 50
        }
        this.color = color
        this.isAttacking

    }

    //sprite replacements with shapes
    draw(){
        //sprite (player)
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        //attack range
        c.fillStyle = 'green'
        c.fillRect(
            this.attackRange.position.x,
            this.attackRange.position.y,
            this.attackRange.width,
            this.attackRange.height
        )
    }

    //sprite movement management
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

    //registers attacks
    attack(){
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
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
    },
    color: 'blue'
})


var key = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }

}


function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    amiya.update()
    reunion.update()


    amiya.velocity.x = 0

    //when a or d is pressed, move left or right
    if(key.a.pressed && amiya.lastPressed === 'a'){
        amiya.velocity.x = -1
    }
    else if(key.d.pressed && amiya.lastPressed === 'd'){
        amiya.velocity.x = 1
    }

    //Hit register
    if(amiya.attackRange.position.x + amiya.attackRange.width >= reunion.position.x
        && amiya.attackRange.position.x <= reunion.position.x + reunion.width
        && amiya.attackRange.position.y + amiya.attackRange.height >= reunion.position.y
        && amiya.attackRange.position.y <= reunion.position.y + reunion.height
        && amiya.isAttacking){
        console.log("hit");
    }

}
animate()

//if a key is pressed, movement is true
window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'd':
            key.d.pressed = true
            amiya.lastPressed = 'd'
            break
        case 'a':
            key.a.pressed = true
            amiya.lastPressed = 'a'
            break
        case ' ':
            amiya.velocity.y = -10
            break
        case 'w':
            amiya.attack()
            break
    }
})

window.addEventListener("click", (event) => {

})

//when a key is lifted, movement is false and stop moving
window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'd':
            key.d.pressed = false
            break
        case 'a':
            key.a.pressed = false
            break
    }
})



