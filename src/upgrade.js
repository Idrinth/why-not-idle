class Upgrade {
    constructor(name, type, stat, percentage, cost, requirements) {
        this.id = name.replace(/[^a-z0-9_\-]+/ig, '-');
        this.name = name;
        this.type = type;
        this.percentage = percentage;
        this.cost = cost;
        this.purchased = 0;
        this.stat = stat;
        this.requirements = requirements?requirements:[];
    }
    _requirementsFullfilled()
    {
        for (let requirement of this.requirements) {
            if(requirement.purchased < this.purchased) {
                return false;
            }
        }
        return true;
    }
    affect(object, stat, value)
    {
        if (stat !== this.stat || !this._requirementsFullfilled()) {
            return value;
        }
        if (object instanceof this.type) {
            return value * Math.pow(this.percentage/100, this.purchased);
        }
        return value;
    }
    buy(money)
    {
        let cost = this.cost * Math.pow(1.25, this.purchased);
        if(money >= cost && this._requirementsFullfilled()) {
            this.purchased++;
            return money-cost;
        }
        return money;
    }
    tick() {
        if (!this._requirementsFullfilled()) {
            return 0;
        }
        let el = document.getElementById("upgrade"+this.id)?document.getElementById("upgrade"+this.id):(()=>{
            let el = document.createElement('tr');
            el.setAttribute('id', "upgrade"+this.id);
            el.appendChild(document.createElement('th'));
            el.firstChild.appendChild(document.createTextNode(this.name));
            el.appendChild(document.createElement('td'));
            el.appendChild(document.createElement('td'));
            el.appendChild(document.createElement('td'));
            el.appendChild(document.createElement('td'));
            el.appendChild(document.createElement('td'));
            el.lastChild.appendChild(document.createElement('button'));
            el.lastChild.lastChild.appendChild(document.createTextNode('Buy'));
            el.lastChild.lastChild.setAttribute("onclick", "player.buy('"+this.name+"')");
            el.lastChild.lastChild.setAttribute("title", this.cost+"gold");
            document.getElementById('upgrades').appendChild(el);
            return el;
        })();
        el.children[0].innerHTML = this.name+"("+this.purchased+")";
        el.children[1].innerHTML = this.type.name;
        el.children[2].innerHTML = this.stat;
        el.children[3].innerHTML = this.stat==="money"?
            (this.percentage * this.purchased).toFixed(2):
            (100*Math.pow(this.percentage/100, this.purchased)).toFixed(1)+"%";
        let cost = (this.cost * Math.pow(1.25, this.purchased)).toFixed(2);
        el.children[4].innerHTML = cost;
        el.lastChild.lastChild.setAttribute("title", cost+"G");
        if(this.purchased > 0 && this.stat === "money" && this.type.constructor === Player) {
            return this.percentage * this.purchased;
        }
        return 0;
    }
}