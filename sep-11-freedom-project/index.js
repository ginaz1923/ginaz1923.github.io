// import resources from './resources.js'
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth - 5
canvas.height = window.innerHeight - 7.25

class Sprite {
    constructor({position, imageSrc, scale = 1, framesMax = 1, offset = {x: 0, y:0}}){
        this.position = position
        this.width = 50
        this.height = 150
        this.offset = offset
    }
    update(){
        this.draw()
    }

}


class Fighter extends Sprite {
    constructor({position, velocity, color = '#4da9b0', offset,}){
        super({
            position,
        })

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
        this.health = 100

    }

    //sprite replacements with shapes
    draw(){
        //sprite (player)
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        //Enemy NPC Health Bar
        c.fillStyle = '#c95757'
        c.fillRect(enemy.position.x - 50 , enemy.position.y - 150, this.width * 3, 10)
        c.fillStyle = '#57c96e'
        c.fillRect(enemy.position.x - 50, enemy.position.y - 150, this.width * 3 * enemy.health/100, 10)

        //attack range
        if(player.isAttacking) {
            c.fillStyle = 'white'
            c.fillRect(
            player.attackRange.position.x,
            player.attackRange.position.y,
            player.attackRange.width,
            player.attackRange.height
            )
        }

        if(enemy.isAttacking){
            c.fillStyle = 'white'
            c.fillRect(
            enemy.attackRange.position.x,
            enemy.attackRange.position.y,
            enemy.attackRange.width,
            enemy.attackRange.height
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
            }, 500)
        }
}

    c.fillRect(0, 0, canvas.width, canvas.height)
    var gravity = 0.5


//player
var player = new Fighter({
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
    },
})



//enemy
var enemy = new Fighter({
    position:{
        x: canvas.width * 3/4,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: '#6e0e1d',
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

// //checks if there is an attack hits a sprite
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
    c.fillStyle = '#d69c78'
    c.fillRect(0, 0, canvas.width, canvas.height)

    player.update()
    enemy.update()

//checks if enemy landed on the ground, then move it towards the player
        if(enemy.position.y + enemy.height + enemy.velocity.y >= canvas.height){
            enemy.velocity.y = 0
            //enemy is to the right of the player
            if(enemy.position.x > player.position.x + player.width && enemy.health > 0){
                enemy.position.x -=5;
            }
            //enemy is to the left of the player
            if(enemy.position.x < player.position.x - player.width && enemy.health > 0){
                enemy.position.x += 5
            }
        }
        else {
            enemy.velocity.y += gravity
        }

        if(enemy.attackRange.position.x <= player.position.x + 50 && enemy.health > 0){
            enemy.attack()
         }
        else {
            enemy.isAttacking = false
        }


    player.velocity.x = 0


    //when a or d is pressed, move left or right
    if(key.a.pressed && player.lastPressed === 'a' && player.health > 0){
        player.velocity.x = -10
    }
    else if(key.d.pressed && player.lastPressed === 'd' && player.health > 0){
        player.velocity.x = 10
    }

//Hit register

    //If player hits enemy
    if(collision({
            rectangle1 : player,
            rectangle2 : enemy
        })
        && player.isAttacking){
        player.isAttacking = false
        enemy.health -=5
        if(enemy.health <= 0){
            enemy.health = 0
            document.querySelector('#displayText').innerHTML = 'You Win!'
            console.log("player wins")
        }
        console.log(enemy.health);
        // console.log("player hit");
    }

    //If enemy hits player
    if(collision({
            rectangle1 : enemy,
            rectangle2 : player
        })
        && enemy.isAttacking){
        enemy.isAttacking = false
        player.health -=1

        if(player.health <= 0){
            player.health = 0
            document.querySelector('#displayText').innerHTML = 'You Lose!'
        }

        document.querySelector('#player').style.width = player.health + '%'
        // console.log(player.health);
        // console.log("enemy hit");
    }

}
animate()

//if a key is pressed, movement is true

window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'd': //right
            key.d.pressed = true
            player.lastPressed = 'd'
            break
        case 'a': //left
            key.a.pressed = true
            player.lastPressed = 'a'
            break
        case ' ': //jump
            player.velocity.y = -10
            break

    }
})

//Attack when mouse is clicked
window.addEventListener('click', (event) => {
     {
        if(player.health > 0){
            player.attack()
        }

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


