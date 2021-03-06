//IIFE -- Immediately Invoked Function Expression
// also called self executing anonymous function
(function(){
    // Game Variables
    let canvas:HTMLCanvasElement;
    let stage:createjs.Stage;
    let AssetManager: createjs.LoadQueue;
    let CurrentScene: objects.Scene;
    let CurrentState: config.Scene;
    let ScoreBoard: managers.ScoreBoard;
    let keyboardManager:managers.Keyboard;
  
    
    
    let Manifest = [
        {id: "Bullet", src:"/Assets/audio/bullet.mp3"},
        {id: "GameMusic", src:"/Assets/audio/backgroundMusic.wav"},
        {id: "HygieneFood", src:"/Assets/audio/rightFoodEat.wav"},
        {id: "HarmfulFood", src:"/Assets/audio/wrongFoodEat.wav"},        
        {id: "StartButton", src:"/Assets/images/StartButton.png"},
        {id: "BackGround", src:"/Assets/images/background.png"},
        {id: "PlayButton", src:"/Assets/images/play.png"},
        {id: "InstructionButton", src:"/Assets/images/instructions.png"},
        {id: "ExitButton", src:"/Assets/images/exit.png"},
        {id: "BackButton", src:"/Assets/images/back.png"},
        {id: "RestartButton", src:"/Assets/images/restart.png"},
        {id: "BulletImg", src:"/Assets/images/bullet.png"},
        {id: "EnemyImg0", src:"/Assets/images/enemy0.png"},
        {id: "EnemyImg1", src:"/Assets/images/enemy1.png"},
        {id: "EnemyImg2", src:"/Assets/images/enemy2.png"},
        {id: "FoodImg0", src:"/Assets/images/food0.png"},
        {id: "FoodImg1", src:"/Assets/images/food1.png"},
        {id: "FoodImg2", src:"/Assets/images/food2.png"},        
        {id: "PlayerImg", src:"/Assets/images/player.png"}
    ]

    

    /**
     *Initi method is called to intialise all the requried object at the start of game
     *
     */
    function Init():void {
        console.log(`%c Assets Loading...`,"font-weight:bold; font-size:20px; color: green;");
        AssetManager = new createjs.LoadQueue();
        managers.Game.AssetManager = AssetManager; // set as single instance of the LoadQueue object
        AssetManager.installPlugin(createjs.Sound); // enables sound file preloading
        AssetManager.on("complete", Start);
        AssetManager.loadManifest(Manifest);
    }

    /**
     *Start method is called after intialization of object of this class
     *
     */
    function Start():void {
        console.log(`%c Game Initializing...`,"font-weight:bold; font-size:20px; color: red;");
        canvas = document.getElementsByTagName("canvas")[0];
        stage = new createjs.Stage(canvas);

        managers.Game.Stage = stage; // create a reference to the stage class

        stage.enableMouseOver(20); // enables mouse over events
        createjs.Ticker.framerate = 60; // sets framerate to 60fps
        createjs.Ticker.on("tick", Update);

        CurrentState = config.Scene.MENU;
        managers.Game.CurrentState = CurrentState;

        ScoreBoard = new managers.ScoreBoard;
        managers.Game.ScoreBoard = ScoreBoard;

        objects.Game.assetManager = AssetManager;

        keyboardManager=new managers.Keyboard;
        objects.Game.keyboardManager=keyboardManager;

        // This is where all the magic happens
        Main();
    }

    /**
     *Update Method is used to update the state of objects
     *
     */
    function Update():void {
        //stats.begin();
        if(CurrentState != managers.Game.CurrentState) {
            CurrentState = managers.Game.CurrentState;
            Main();
        }

        CurrentScene.Update();

        stage.update();

        //stats.end();
    }

    /**
     *Main method is called after start state of class
     *
     */
    function Main():void {
        console.log(`%c Switching Scenes...`,"font-style:italic; font-size:16px; color:blue;");

        stage.removeAllChildren();
   
        switch(CurrentState) {
            case config.Scene.MENU:
            CurrentScene = new scenes.Menu(AssetManager);
            break;

            case config.Scene.GAMEPLAY:
            CurrentScene = new scenes.GamePlay(AssetManager);
            break;

            case config.Scene.GAMEOVER:
            CurrentScene = new scenes.GameOver(AssetManager);
            break;

            case config.Scene.INSTRUCTIONS:
            CurrentScene = new scenes.Instructions(AssetManager);
            break;
        }
        managers.Game.CurrentScene = CurrentScene;
        stage.addChild(CurrentScene);
    }
    window.addEventListener("load", Init);
})();