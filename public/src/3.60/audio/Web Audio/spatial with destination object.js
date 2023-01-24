class Example extends Phaser.Scene {

    preload() {
        this.load.pack('pack1', {
                "pack": {
                    "files": [
                        {
                            "type": "audio",
                            "key": "theme",
                            "url": [
                                "assets/audio/oedipus_wizball_highscore.ogg",
                                "assets/audio/oedipus_wizball_highscore.mp3"
                            ]
                        },
                        {
                            "type": "image",
                            "key": "phaser-dude",
                            "url": "assets/sprites/phaser-dude.png"
                        },
                        {
                            "type": "image",
                            "key": "speaker",
                            "url": "assets/sprites/speakers/middle.png"
                        }
                    ]
                }});
    }

    create() {

        this.speaker= this.add.image(400, 400, 'speaker');

        this.music = this.sound.add('theme');

        this.text = this.add.text(400, 100, 'Loading...', {
            fontFamily: '\'Sorts Mill Goudy\', serif',
            fontSize: 40,
            color: '#fff',
            align: 'center'
        });
        this.text.setOrigin(0.5);

        this.enableInput.call(this);
    }

    enableInput() {
        this.text.setText('Drag dude to start');

        var image = this.add.sprite(200, 300, 'phaser-dude').setInteractive();

        this.input.setDraggable(image);

        this.input.on('pointerdown', function (pointer) {

            this.music.play({source:this.speaker});

            this.sound.setAudioDestination(image);

            this.text.setText('Audio destination at x:' + image.x +', y:'+ image.y);
        }, this);

        this.input.on('pointerup', function(pointer){

            this.music.stop();

        }, this);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;
            this.text.setText('Audio destination at x:' + image.x +', y:'+ image.y);

        }, this);
    }


}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
