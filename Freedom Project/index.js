// import resources from './resources.js'


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

canvas.width = window.innerWidth - 5
canvas.height = window.innerHeight - 7.25

c.fillRect(0, 0, canvas.width, canvas.height)

var gravity = 0.5

class Sprite {
    constructor({position, velocity, color = 'red', offset}){
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastPressed

        this.attackRange = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
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
        if (amiya.isAttacking) {
            c.fillStyle = 'green'
            c.fillRect(
            this.attackRange.position.x,
            this.attackRange.position.y,
            this.attackRange.width,
            this.attackRange.height
            )
        }

    }

    //sprite movement management
    update(){
        this.draw()

        //the attack range position is attached to the sprites positions
        this.attackRange.position.x = this.position.x + this.attackRange.offset.x
        this.attackRange.position.y = this.position.y

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
    },
    offset: {
        x: 0,
        y: 0
    }
})



//reunion enemy
var reunion = new Sprite({
    position:{
        x: canvas.width * 3/4,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    offset: {
        x: -50,
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


//checks if there is an attack collision
function collision({
    rectangle1,
    rectangle2
}){
    return(
        rectangle1.attackRange.position.x + rectangle1.attackRange.width >= rectangle2.position.x
        && rectangle1.attackRange.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle1.attackRange.position.y + rectangle1.attackRange.height >= rectangle2.position.y
        && rectangle1.attackRange.position.y <= rectangle2.position.y + rectangle2.height
    )
}

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    amiya.update()
    reunion.update()

    if(reunion.position.y + reunion.height + reunion.velocity.y >= canvas.height){
        reunion.velocity.y = 0
        if(reunion.position.x > amiya.position.x + amiya.width){
            reunion.position.x -=5;
        }

        if(reunion.position.x < amiya.position.x - amiya.width){
            reunion.position.x += 5
        }


    }
    else {
        reunion.velocity.y += gravity
    }



    amiya.velocity.x = 0

    //when a or d is pressed, move left or right
    if(key.a.pressed && amiya.lastPressed === 'a'){
        amiya.velocity.x = -10
    }
    else if(key.d.pressed && amiya.lastPressed === 'd'){
        amiya.velocity.x = 10
    }

    //Hit register
    //If amiya hits enemy
    if(
        collision({
            rectangle1 : amiya,
            rectangle2 : reunion
        })
        && amiya.isAttacking){
        amiya.isAttacking = false
        //decrease health bar when hit
        document.querySelector('#amiya').style.width = '30%'
        console.log("amiya hit");
    }

    //If enemy hits amiya
    if(
        collision({
            rectangle1 : reunion,
            rectangle2 : amiya
        })
        && reunion.isAttacking){
        reunion.isAttacking = false
        console.log("reunion hit");
    }

}
animate()

//if a key is pressed, movement is true
window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'd': //right
            key.d.pressed = true
            amiya.lastPressed = 'd'
            break
        case 'a': //left
            key.a.pressed = true
            amiya.lastPressed = 'a'
            break
        case ' ': //jump
            amiya.velocity.y = -10
            break
    }
})

//Attack when mouse is clicked
window.addEventListener('click', (event) => {
     {
        amiya.attack()
     }

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



