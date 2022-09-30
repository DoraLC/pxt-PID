/**
 * Blocks for PID controller.
 */

//% color=#6CC0F7 icon="\uf121" block="PID controller"

namespace pid {
    export class pid_controller {
        pre_error: number = 0;
        time_i: number = 0;
        time_i_1: number = 0;
        setpoint: number;
        Kp: number;
        Ki: number;
        Kd: number;
        max: number;
        min: number;
        dt: number = 0;
        error: number;
        pid_p: number;
        pid_i: number;
        pid_d: number;

        constructor(
        _setpoint: number, 
        _Kp: number, 
        _Ki: number, 
        _Kd: number, 
        _max: number, 
        _min: number) {
            this.setpoint = _setpoint;
            this.Kp = _Kp;
            this.Ki = _Ki;
            this.Kd = _Kd;
            this.max = _max;
            this.min = _min;
        }

        //% block="PID value for %pid|present value %pv"
        pid_value(pv: number): number{
            this.time_i_1 = this.time_i;
            this.time_i = input.runningTime();
            this.dt = (this.time_i - this.time_i_1);
            this.error = pv- this.setpoint;
            let d_error = this.error - this.pre_error;
            this.pid_p = this.Kp*this.error;
            this.pid_i = this.Ki*(this.error*(1 + this.dt));
            this.pid_d = this.Kd*(d_error/this.dt);
            this.pre_error = this.error;

            let tmp = this.pid_p + this.pid_i + this.pid_d;
            return Math.min(Math.max(this.min, tmp), this.max);
        }
    }

    //% block="PID controller Set|setpoint %setpoint|Kp %Kp|Ki %Ki|Kd %Kd|max %max|min %min"
    //% blockSetVariable=pid
    //% setpoint.defl=0 Kp.defl=0 Ki.defl=0 Kd.defl=0  max.defl=100 min.defl=-100
    export function create(
        setpoint: number, 
        Kp: number, 
        Ki: number, 
        Kd: number, 
        max: number, 
        min: number): pid_controller {
        let system = new pid_controller(setpoint, Kp, Ki, Kd, max, min);
        return system
    }
}