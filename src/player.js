class Player extends Unit {
    constructor(upgrades)
    {
        super(0, 1);
        this.units = [this];
        this.money = 10;
        this.quest = new Quest(1, 0);
        this.name = "Player";
        this.upgrades = upgrades;
        this.job = new Job('Fated One', [
            new Upgrade('', Unit, "attack", 110),
            new Upgrade('', Unit, "defense", 110)
        ]);
    }
    addUnit()
    {
        if (this.money >= (95+Math.pow(5, this.units.length))) {
            this.money -= (95+Math.pow(5, this.units.length));
            this.units.push(new Unit(this.units.length, 1));
        }
    }
    handleAge() {
        this.age++;
        if (this.age>5000 && Math.random()<(this.age-5000)/100000) {
            let tmp = new Unit(
                this.id,
                (this.level+this.rarity)/1000 > Math.random()?
                    Math.min(Math.round(this.level/100*Math.random())+this.rarity, 10):
                    this.rarity
            );
            for (let property in tmp) {
                this[property] = tmp[property];
            }
            this.name = "Player";
        }
    }
    buy(upgrade) {
        for (let up of this.upgrades) {
            if(up.name === upgrade) {
                this.money = up.buy(this.money);
                return;
            }
        }
    }
    tick()
    {
        for(let unit of this.units) {
            if (unit === this) {
                super.tick(0, this.quest, this.upgrades);
                this.money -= 0.025;
            } else {
                this.money -= unit.tick(this.level/100, this.quest, this.upgrades)/(1+this.level/10);
            }
            let next = unit.handleAge();
            if (next instanceof Unit) {
                unit = next;
            }
        }
        if(this.quest) {
            if(this.quest.tick()) {
                this.money += this.quest.rewards*(1+this.quest.duration/1000);
                this.quest = null;
            } else {
                for(let i = this.quest.number; i > 0; i--) {
                    this.units[i%this.units.length].fight(this.quest, this.upgrades);
                }
            }
        }
        for(let buff of this.upgrades) {
            this.money += buff.tick();
        }
        if (this.money < 0) {
            this.money *= 1.001;
        }
        if(!this.quest) {
            for(let unit of this.units) {
                unit.knockedout = 0;
            }
            this.quest = new Quest(this.level+Math.random(), this.units.length);
        }
        let fields = document.getElementById('stats').getElementsByTagName('td');
        fields[0].innerHTML = this.money.toFixed(2);
        fields[1].setAttribute("title", (95+Math.pow(5, this.units.length))+"G");
    }
}
