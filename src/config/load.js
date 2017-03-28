import loadjs from 'loadjs';

/**
 * 加载资源
 * lib         {string} 资源路径
 * libBackups? {string} 备份的资源路径, lib加载出错时才加载, 防止 别人的cdn 挂掉, 我们的项目就崩了
 */
async function load(lib, libBackups) {
    return new Promise((resolve, reject) => {
        loadjs([lib], lib);
        loadjs.ready(lib, {
            success() {
                resolve();
                console.info(`${lib} 加载成功`);
            },
            error() {
                if (libBackups) {
                    console.warn(`${lib} 加载失败`);
                    // 如果有备份路径, 加载备份路径
                    return load(libBackups);
                } else {
                    console.error(`${lib} 加载失败`);
                    // 没有就报错
                    reject();
                }
            },
        });
    });
}

export default load;
