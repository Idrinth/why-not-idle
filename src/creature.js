class Creature {
    constructor(stats, addition) {
        this.attack = 0.5*stats+Math.floor(Math.random()*stats);
        this.defense = 2*stats-this.attack;
        this.attack *= 0.9+(addition/100+0.25)*Math.random();
        this.defense *= 0.9+(addition/100+0.25)*Math.random();
    }
    fight(attacker, attackerBuffs, defenderBuffs) {
        let attack = attacker.attack;
        attackerBuffs = attackerBuffs?attackerBuffs:[];
        defenderBuffs = defenderBuffs?defenderBuffs:[];
        for (let buff of attackerBuffs) {
            attack = buff.affect(attacker, 'attack', attack);
        }
        if (attacker.job) {
            for (let buff of attacker.job.modifiers) {
                attack = buff.affect(attacker, 'attack', attack);
            }
        }
        let defense = this.defense;
        for (let buff of defenderBuffs) {
            defense = buff.affect(this, 'defense', defense);
        }
        if (this.job) {
            for (let buff of this.job.modifiers) {
                defense = buff.affect(this, 'defense', defense);
            }
        }
        if (attack * (Math.random()+0.1) > defense * (Math.random()+0.1)) {
            return true;
        }
        return false;
    }
}
