class Unit extends Creature {
    constructor(id, rarity)
    {
        super(50+rarity*10, rarity);
        this.id = id;
        this.name = ['A','B','C','D','E'][Math.floor(Math.random()*5)]+id;
        this.rarity = rarity;
        this.level = 0;
        this.xp = 0;
        this.knockedout = 0;
        this.kills = 0;
        this.age = 0;
        this.maxLevel = 100+this.rarity*this.rarity;
        this.job = generateJob();
    }
    tick(boost, quest, upgrades)
    {
        let xp = (1+boost)/(1+this.rarity);
        if(this.xp >= Math.ceil(Math.pow(1.5, this.level)*100)) {
            this.xp -= Math.ceil(Math.pow(1.5, this.level)*100);
            this.attack += this.attack*(0.4+0.1*Math.random()+0.025*this.rarity);
            this.defense += this.defense*(0.4+0.1*Math.random()+0.025*this.rarity);
            this.level++;
        }
        if (quest && !this.knockedout) {
            if (quest.fight(this, upgrades)) {
                xp++;
            }
        } else if(this.knockedout > 0) {
            this.knockedout--;
        }
        for (let upgrade of upgrades) {
            xp = upgrade.affect(this, 'xp', xp);
        }
        this.xp += xp;
        this.level = Math.min(this.level, this.maxLevel);
        let el = document.getElementById("unit"+this.id)?document.getElementById("unit"+this.id):(()=>{
            let el = document.createElement('tr');
            el.setAttribute('id', "unit"+this.id);
            el.appendChild(document.createElement('th'));
            el.firstChild.appendChild(document.createTextNode(this.name));
            el.appendChild(document.createElement('td'));
            el.appendChild(document.createElement('td'));
            el.lastChild.setAttribute('class', 'level');
            el.appendChild(document.createElement('td'));
            el.appendChild(document.createElement('td'));
            el.appendChild(document.createElement('td'));
            el.appendChild(document.createElement('td'));
            el.appendChild(document.createElement('td'));
            document.getElementById('units').appendChild(el);
            return el;
        })();
        el.children[0].innerHTML = this.name;
        el.children[1].innerHTML = this.job.name;
        el.children[2].innerHTML = this.level;
        el.children[2].setAttribute(
            'title',
            "Max: "+this.maxLevel+(this.level<this.maxLevel?"\nXP: "+this.xp.toFixed(0)+' of '+Math.ceil(Math.pow(1.5, this.level)*100):'')
        );
        el.children[2].setAttribute(
            'style',
            "background-size: "+Math.floor(this.xp/Math.ceil(Math.pow(1.5, this.level)*100)*100)+"% 100%;"
        );
        el.children[3].innerHTML = this.rarity;
        el.children[4].innerHTML = Math.floor(this.attack);
        el.children[5].innerHTML = Math.floor(this.defense);
        el.children[6].innerHTML = Math.floor(15+this.age/100);
        el.children[7].innerHTML = this.kills;
        if (this.knockedout) {
            el.children[0].setAttribute("style", "background: #aa0000");
        } else if(el.children[2].hasAttribute("style")) {
            el.children[0].removeAttribute("style");
        }
        return (this.level+1)*this.rarity/(1+Math.random())/100;
    }
    handleAge() {
        this.age++;
        if (this.age>5000 && Math.random()<(this.age-5000)/100000) {
            if ((this.level+this.rarity)/1000 > Math.random()) {
                console.log("Rebirth!");
                return new Unit(this.id, Math.min(Math.round(this.level/100*Math.random())+this.rarity, 10));
            } else {
                console.log("Death!");
                return new Unit(this.id, 1);
            }
        }
        return;
    }
    fight(attacker, upgrades) {
        if (super.fight(attacker, [], upgrades) && Math.random () > this.level/100) {
            this.knockedout++;
        }
    }
}
