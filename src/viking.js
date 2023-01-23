Array.prototype.getRandomElement = function(){
    return this[Math.floor(Math.random() * this.length)];
}

// Soldier
class Soldier {
    constructor(health, strength) {
        this.health = health;
        this.strength = strength;
    }

    attack() {
        return this.strength;
    }

    receiveDamage(damage) {
        this.health -= damage;
    }
  }

// Viking
class Viking extends Soldier {
    constructor (name, health, strength) {
        super(health, strength);
        this.name = name;
    }

    receiveDamage(damage) {
        super.receiveDamage(damage);
        if (this.health > 0) return `${this.name} has received ${damage} points of damage`;
        else return `${this.name} has died in act of combat`
    }

    battleCry() {
        return 'Odin Owns You All!'
    }
}

// Saxon
class Saxon extends Soldier {
    receiveDamage(damage) {
        super.receiveDamage(damage);
        if (this.health > 0) return `A Saxon has received ${damage} points of damage`;
        else return `A Saxon has died in combat`
    }
}

// War
class War {
    constructor(){
        this.vikingArmy = [];
        this.saxonArmy = [];
    }

    addViking(viking){
        this.vikingArmy.push(viking)
    }

    addSaxon(saxon){
        this.saxonArmy.push(saxon)
    }

    armyAttack(attackingArmy, defendingArmy) {
        const attacker = attackingArmy.getRandomElement();
        const defender = defendingArmy.getRandomElement();
        const attackResult = defender.receiveDamage(attacker.attack());

        if (defender instanceof Saxon) this.saxonArmy = defendingArmy.filter(soldier => soldier.health > 0);
        else this.vikingArmy = defendingArmy.filter(soldier => soldier.health > 0);
        
        return attackResult;
    }

    vikingAttack(){
        return this.armyAttack(this.vikingArmy, this.saxonArmy)
    }

    saxonAttack(){
        return this.armyAttack(this.saxonArmy, this.vikingArmy)
    }

    showStatus(){
        if (!this.saxonArmy.length) return 'Vikings have won the war of the century!';
        if (!this.vikingArmy.length) return 'Saxons have fought for their lives and survived another day...';
        return 'Vikings and Saxons are still in the thick of battle.';
    }
}