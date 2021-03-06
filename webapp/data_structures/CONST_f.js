function CONST_f() {

    CONST_f.prototype.define = function CONST_f() {
        this.C = [1];

        var model = scicos_model();
        model.sim = list(new ScilabString(["cstblk"]), new ScilabDouble([1]));
        model.in = new ScilabDouble();
        model.out = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([this.C]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([sci2exp(this.C)]);
        this.displayParameter = [1];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CONST_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    CONST_f.prototype.details = function CONST_f() {

        return this.x;
    }
    CONST_f.prototype.get = function CONST_f() {
        var options={
            C:["Constant",sci2exp(this.C)],
        }
        return options
    }
CONST_f.prototype.set = function CONST_f() {
    this.C = MatrixInverse(arguments[0]["C"])
    this.nout = size(this.C,"*")
    if(this.nout==0){
        alert("C must have at least one element");
        CONST_f.get();
    }
    this.displayParameter = [this.C];
    this.x.model.rpar = new ScilabDouble(...this.C)
    this.x.model.out = new ScilabDouble(this.nout)
    var exprs = new ScilabString([sci2exp(this.C)]);
    //var exprs = new ScilabString([this.C.toString().replace(/,/g, " ")])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

    CONST_f.prototype.get_popup_title = function CONST_f() {
        var set_param_popup_title="Set Contant Block";
        return set_param_popup_title
    }
    CONST_f.prototype.getDimensionForDisplay = function CONST_f(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }

}
