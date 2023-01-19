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
                            "key": "headphone-girl",
                            "url": "assets/pics/girl-with-headphones-cc.jpeg"
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
        this.add.image(400, 400, 'headphone-girl').setScale(.2);

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
        this.text.setText('Drag speaker to start');

        var image = this.add.sprite(200, 300, 'speaker').setInteractive();

        this.input.setDraggable(image);

        this.input.on('pointerdown', function (pointer) {

            this.music.play({source:image});

        }, this);

        this.input.on('pointerup', function(pointer){

            this.music.stop();

        }, this);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;

        });
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
