/**
 * Functions for the sht31 temp and humidity sensor and the Calliope mini
 *
 * @author Moritz Heine
 */

//% weight=3 color=#97699c block="SHT31"
namespace sht31 {
    let ADDRESS = 0x44;
    let temp = 0;
    let humidity = 0;

    function readTempHum(): boolean {
        let tmp_buf = 0
        let hum_buf = 0
        pins.i2cWriteNumber(ADDRESS, 0x2400, NumberFormat.UInt16BE)
        basic.pause(100)

        let buf = pins.i2cReadBuffer(ADDRESS, 6, false)
        if (buf.length != 6) {
            return false
        }
        tmp_buf = buf[0] << 8
        tmp_buf |= buf[1]

        hum_buf = buf[3] << 8
        hum_buf |= buf[4]

        temp = tmp_buf * 175 / (0xffff - 1) - 45
        humidity = hum_buf * 100 / (0xffff - 1)
        return true
    }

    /**
     * Read temp
     */
    //% blockId=readTemp
    //% block="read temp"
    //% block.loc.de="Temperatur"
    export function readTemp(): number {
        if (!readTempHum()) {
            return 0
        }
        return temp
    }

    /**
     * Read humidity
     */
    //% blockId=digitalRead
    //% block="read humidity"
    //% block.loc.de="Luftfeuchtigkeit"
    export function readHum(): number {
        if (!readTempHum()) {
            return 0
        }
        return humidity
    }
}
