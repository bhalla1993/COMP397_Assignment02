var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        function Player(assetManager) {
            var _this = _super.call(this, assetManager, "PlayerImg") || this;
            _this.Start();
            return _this;
        }
        // private methods
        Player.prototype._checkBounds = function () {
            // check right boundary
            if (this.x > config.Screen.WIDTH - this.halfWidth) {
                this.x = config.Screen.WIDTH - this.halfWidth;
            }
            // check left boundary
            if (this.x < this.halfWidth) {
                this.x = this.halfWidth;
            }
        };
        // public methods
        Player.prototype.Start = function () {
            this.scaleX = 0.15;
            this.scaleY = 0.15;
            this.y = 460;
        };
        Player.prototype.Update = function () {
            //this.x = managers.Game.Stage.mouseX;
            //  alert("inside player update ");
            this.Move();
            this._checkBounds();
        };
        Player.prototype.Reset = function () { };
        Player.prototype.Move = function () {
            /*
            console.log("move left : " + objects.Game.keyboardManager.moveLeft);
            console.log("move right : " + objects.Game.keyboardManager.moveRight);
            console.log("move up : " + objects.Game.keyboardManager.moveForward);
            console.log("move down : " + objects.Game.keyboardManager.moveBackward);
            */
            //Keyboard Controls
            if (objects.Game.keyboardManager.moveLeft) {
                this.x -= 5;
            }
            if (objects.Game.keyboardManager.moveRight) {
                this.x += 5;
            }
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map