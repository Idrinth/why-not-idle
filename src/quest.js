class Quest extends Creature {
    constructor(difficulty, units)
    {
        const enemies = {
            Kobolds: 20,
            Goblins: 30,
            Orks: 40,
            Urukai: 50,
            Trolls: 75,
            Daemons: 90,
            Giants: 125,
            Golems: 150,
            Lichs: 300,
            Dragons: 500
        };
        let enemy = Object.keys(enemies)[Math.min(Math.floor(Math.random()*Math.random()*10*difficulty), Math.ceil(difficulty*2-1))];
        super(enemies[enemy], 0);
        this.duration = 0;
        this.number = Math.ceil(units*(0.5+Math.random())*difficulty);
        this.name = "Fight "+this.number+" "+enemy;
        this.rewards = difficulty*difficulty*(Math.random()+units);
        this.attack = (0.9+0.25*Math.random()) * this.attack;
        this.defense = (0.9+0.25*Math.random()) * this.defense;
    }
    fight(attacker, upgrades) {
        if (this.number === 0) {
            return false;
        }
        if (super.fight(attacker, upgrades, [])) {
            this.number--;
            return true;
        }
        return false;
    }
    tick () {
        this.duration++;
        let fields = document.getElementById('quest').getElementsByTagName('td');
        fields[0].innerHTML = this.name;
        fields[1].innerHTML = this.number;
        fields[2].innerHTML = Math.floor(this.attack);
        fields[3].innerHTML = Math.floor(this.defense);
        fields[4].innerHTML = this.rewards.toFixed(2);
        return this.number === 0;
    }
}