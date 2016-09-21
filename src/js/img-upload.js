var reg = {};
reg.canvasResize = canvasResize;
reg.img = (function () {
    var configMap = {
            main_html: String()
            + '<div class="img-box">'
            + '<div class="loading-box">'
            + '<img src="http://static.xiaojukeji.com/webapp/images/loading_2.gif" class="loading-item">'
            + '</div>'
            + '</div>'
            + '<form method="post" target="img-ifr" enctype="multipart/form-data" action="/api/v2/d_register/new_upload_img">'
            + '<input type="file" accept="image/*" name="__x_img" value="点击上传">'
            + '</form>'
            + '<div class="btn-upload btn-gray">'
            + '点击上传'
            + '</div>',
            settable_map: {
                crop: true,         //是否裁剪
                quality: true,      //图片质量
                rotate: true,       //旋转角度
                resizeCb: true,   //图片上传完成的callback
                //imgInitSucc: true,  //图片初始化成功的callback
                failFn: true   //图片初始化失败的callback
            },
            crop: false,
            quality: 0.1,
            rotate: 0,
            resizeCb: null,
            //imgInitSucc: null,
            failFn: null
        },
        stateMap = {
            container: null
        },
        DomMap = {},
        initModule, configModule,
        setDomMap, imgInit;

    configModule = function (input_map) {
        util.setConfigModule({
            input_map: input_map,
            settable_map: configMap.settable_map,
            config_map: configMap
        });
        return true;
    };

    setDomMap = function () {
        var container = stateMap.container;
        DomMap = {
            imgFile: container.querySelector('[type="file"]'),
            imgBox: container.querySelector('.img-box'),
            loadingImg: container.querySelector('.loading-box')
        }
    };



    imgInit = function (src) {
        if(!src) return ;
        var img = new Image();
        img.src = src;

        //style修改函数
        img.style.maxWidth = '100%';
        img.style.height = '193px';
        img.style.borderTopLeftRadius = '5px';
        img.style.borderTopRightRadius = '5px';

        //上传成功
        img.onload = function () {
            var aImg = DomMap.imgBox.querySelector('.loading-box+img');
            aImg && (DomMap.imgBox.removeChild(aImg));
            DomMap.imgBox.appendChild(this);
            DomMap.loadingImg.style.position = 'absolute';
            DomMap.loadingImg.style.height = DomMap.imgBox.offsetHeight + 'px';
            util.addClass(DomMap.loadingImg, 'common-hide');

            //图片初始化成功
            //typeof configMap.imgInitSucc === 'function' && configMap.imgInitSucc();
        };

        //上传失败
        img.error = function () {
            return configMap.failFn('网络繁忙,请稍后重试');
        };

    };

    initModule = function (container) {

        stateMap.container = container;
        container.innerHTML = configMap.main_html;
        setDomMap();


        //绑定图片选择事件
        DomMap.imgFile.addEventListener('change', function () {
            var file = this.files[0];
            if(!file) return;

            //配置的错误处理函数来处理
            if(typeof FileReader === 'undefined') {
                return configMap.failFn('非常抱歉，您的手机不支持文件上传，请更换手机注册，谢谢');
            }

            //图片压缩
            canvasResize(file, {
                crop: configMap.crop,
                quality: configMap.quality,
                rotate: configMap.rotate,
                callback: function (baseStr) {  //图片压缩成功后的回调函数
                    var cb = configMap.resizeCb;
                    typeof cb === 'function' && cb(baseStr);
                }
            });
        });
    };

    return {
        initModule: initModule,
        configModule: configModule,
        imgInit: imgInit    //向外暴露图片加载方法
    }
    
})();
