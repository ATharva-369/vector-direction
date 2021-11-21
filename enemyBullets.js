AFRAME.registerComponent("enemy-bullet",{
init:function(){
setInterval(this.shootEnemybullet,2000);
},
shootEnemybullet:function(){
var e = document.querySelectorAll(".enemy");
for(var i=0;i<e.length;i++){
    var bullet = document.createElement("a-entity");
    bullet.setAttribute("geometry",{
        "primitive":"sphere",
        "radius":0.1
    })
    bullet.setAttribute("material",
        "color","black"
    );
    var pos = e[i].getAttribute("position");
    bullet.setAttribute("position",{
        x:pos.x + 1.5,
        y:pos.y + 3.5,
        z : pos.z
    });
    var scene = document.querySelector("#scene");
    scene.appendChild(bullet);

    var enemy = e[i].object3D;
    var player = document.querySelector("#weapon").object3D;

    var posE = new THREE.Vector3();
    var posP = new THREE.Vector3();

    player.getWorldPosition(posP);
    enemy.getWorldPosition(posE);

    var direction = new THREE.Vector3();
    direction.subVectors(posP,posE).normalize();

    bullet.setAttribute("dynamic-body",{
        "shape" : "sphere",
        "mass" : 0
    });
    bullet.setAttribute("velocity",direction.multiplyScalar(10));

    var element = document.querySelector("#countLife");
    var playerLife = parseInt(element.getAttribute("text").value);
    bullet.addEventListener("collide",function(e){
        if(e.detail.body.el.id === "weapon"){
            if(playerLife > 0){
                playerLife--;
                element.setAttribute("text",{
                    value : playerLife
                })
            }
            else if(playerLife <= 0){
                var t = document.querySelector("#over");
                t.setAttribute("visible",true);
                var tank = document.querySelectorAll(".enemy");

                for(var i=0; i < tank.length; i++){
                    scene.removeChild(tank[i])
                }
            }
        };
    });
}
}
})