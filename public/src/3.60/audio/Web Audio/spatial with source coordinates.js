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
        this.text.setText('Click to start');

        this.input.on('pointerdown', function (pointer) {
            this.music.play({source:{x:pointer.x, y:pointer.y, panningModel:'HRTF', distanceModel:'linear', rollOff:10 }});
            this.text.setText('Audio source at x:' + pointer.x +', y:'+ pointer.y);
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
