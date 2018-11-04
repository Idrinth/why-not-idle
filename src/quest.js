class Quest extends Creature {
    constructor(difficulty, units)
    {
        const enemies = {
            Zombies: 15,
            Kobolds: 20,
            Goblins: 30,
            Orks: 40,
            Urukai: 50,
            Ogres: 65,
            Trolls: 75,
            "Lesser Daemons": 90,
            Giants: 125,
            "Lesser Devils": 130,
            Golems: 150,
            Vampires: 200,
            Lichs: 300,
            Dragons: 500,
            Devils: 666,
            Daemons: 700,
            Divines: 850
        };
        const locations = {
            "Open Fields": 0,
            Castle: -10,
            Ruins: -5,
            Forest: 10,
            Caverns: 15,
            Town: 20
        };
        let enemy = Object.keys(enemies)[Math.min(Math.floor(Math.random()*Math.random()*10*difficulty), Math.ceil(difficulty*2-1))];
        super(enemies[enemy], 0);
        this.location = Object.keys(locations)[Math.floor(Math.random() * Object.keys(locations).length)];
        this.duration = 0;
        this.number = Math.ceil(units*(0.5+Math.random())*difficulty);
        this.name = "Fight "+this.number+" "+enemy+"("+this.location+")";
        this.rewards = difficulty*difficulty*(Math.random()+units) + 0.1;
        this.attack = (0.9+0.25*Math.random()) * (this.attack + locations[this.location]);
        this.defense = (0.9+0.25*Math.random()) * (this.defense + locations[this.location]);
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
