const { checkBuffer } = require('./helper')
const { Usage } = require('../constants')

/**
 * decodes dpt14
 *
 * @param {string} dpt
 * @param {Buffer} encoded
 * @return {number}
 *
 * @throws {Error} Will throw an error if <encoded> is not a Buffer
 * @throws {Error} Will throw an error if the byteLength of <encoded> is not equal to 4
 */
function decode (dpt, encoded) {
  checkBuffer(encoded, 4)

  return encoded.readFloatBE()
}

/**
 * encodes dpt14
 *
 * @param {string} dpt
 * @param {number} [decoded]
 * @return {Buffer}
 */
function encode (dpt, decoded) {
  const value = Number(decoded)
  const buffer = Buffer.alloc(4, 0)
  buffer.writeFloatBE(value)
  return buffer
}

/**
 * dpt definitions
 */
module.exports = {
  common: {
    bitlength: 32
  },
  0: {
    name: 'DPT_Value_Acceleration',
    encode,
    decode,
    use: Usage.GENERAL
  },
  1: {
    name: 'DPT_Value_Acceleration_Angular',
    encode,
    decode,
    use: Usage.GENERAL
  },
  2: {
    name: 'DPT_Value_Activation_Energy',
    encode,
    decode,
    use: Usage.GENERAL
  },
  3: {
    name: 'DPT_Value_Activity',
    encode,
    decode,
    use: Usage.GENERAL
  },
  4: {
    name: 'DPT_Value_Mol',
    encode,
    decode,
    use: Usage.GENERAL
  },
  5: {
    name: 'DPT_Value_Amplitude',
    encode,
    decode,
    use: Usage.GENERAL
  },
  6: {
    name: 'DPT_Value_AngleRad',
    encode,
    decode,
    use: Usage.GENERAL
  },
  7: {
    name: 'DPT_Value_AngleDeg',
    encode,
    decode,
    use: Usage.GENERAL
  },
  8: {
    name: 'DPT_Value_Angular_Momentum',
    encode,
    decode,
    use: Usage.GENERAL
  },
  9: {
    name: 'DPT_Value_Angular_Velocity',
    encode,
    decode,
    use: Usage.GENERAL
  },
  10: {
    name: 'DPT_Value_Area',
    encode,
    decode,
    use: Usage.GENERAL
  },
  11: {
    name: 'DPT_Value_Capacitance',
    encode,
    decode,
    use: Usage.GENERAL
  },
  12: {
    name: 'DPT_Value_Charge_DensitySurface',
    encode,
    decode,
    use: Usage.GENERAL
  },
  13: {
    name: 'DPT_Value_Charge_DensityVolume',
    encode,
    decode,
    use: Usage.GENERAL
  },
  14: {
    name: 'DPT_Value_Compressibility',
    encode,
    decode,
    use: Usage.GENERAL
  },
  15: {
    name: 'DPT_Value_Conductance',
    encode,
    decode,
    use: Usage.GENERAL
  },
  16: {
    name: 'DPT_Value_Electrical_Conductivity',
    encode,
    decode,
    use: Usage.GENERAL
  },
  17: {
    name: 'DPT_Value_Density',
    encode,
    decode,
    use: Usage.GENERAL
  },
  18: {
    name: 'DPT_Value_Electric_Charge',
    encode,
    decode,
    use: Usage.GENERAL
  },
  19: {
    name: 'DPT_Value_Electric_Current',
    encode,
    decode,
    use: Usage.GENERAL
  },
  20: {
    name: 'DPT_Value_Electric_CurrentDensity',
    encode,
    decode,
    use: Usage.GENERAL
  },
  21: {
    name: 'DPT_Value_Electric_DipoleMoment',
    encode,
    decode,
    use: Usage.GENERAL
  },
  22: {
    name: 'DPT_Value_Electric_Displacement',
    encode,
    decode,
    use: Usage.GENERAL
  },
  23: {
    name: 'DPT_Value_Electric_FieldStrength',
    encode,
    decode,
    use: Usage.GENERAL
  },
  24: {
    name: 'DPT_Value_Electric_Flux',
    encode,
    decode,
    use: Usage.GENERAL
  },
  25: {
    name: 'DPT_Value_Electric_FluxDensity',
    encode,
    decode,
    use: Usage.GENERAL
  },
  26: {
    name: 'DPT_Value_Electric_Polarization',
    encode,
    decode,
    use: Usage.GENERAL
  },
  27: {
    name: 'DPT_Value_Electric_Potential',
    encode,
    decode,
    use: Usage.GENERAL
  },
  28: {
    name: 'DPT_Value_Electric_PotentialDifference',
    encode,
    decode,
    use: Usage.GENERAL
  },
  29: {
    name: 'DPT_Value_ElectromagneticMoment',
    encode,
    decode,
    use: Usage.GENERAL
  },
  30: {
    name: 'DPT_Value_Electromotive_Force',
    encode,
    decode,
    use: Usage.GENERAL
  },
  31: {
    name: 'DPT_Value_Energy',
    encode,
    decode,
    use: Usage.GENERAL
  },
  32: {
    name: 'DPT_Value_Force',
    encode,
    decode,
    use: Usage.GENERAL
  },
  33: {
    name: 'DPT_Value_Frequency',
    encode,
    decode,
    use: Usage.GENERAL
  },
  34: {
    name: 'DPT_Value_Frequency',
    encode,
    decode,
    use: Usage.GENERAL
  },
  35: {
    name: 'DPT_Value_Heat_Capacity',
    encode,
    decode,
    use: Usage.GENERAL
  },
  36: {
    name: 'DPT_Value_Heat_FlowRate',
    encode,
    decode,
    use: Usage.GENERAL
  },
  37: {
    name: 'DPT_Value_Heat_Quantity',
    encode,
    decode,
    use: Usage.GENERAL
  },
  38: {
    name: 'DPT_Value_Impedance',
    encode,
    decode,
    use: Usage.GENERAL
  },
  39: {
    name: 'DPT_Value_Length',
    encode,
    decode,
    use: Usage.GENERAL
  },
  40: {
    name: 'DPT_Value_Light_Quantity',
    encode,
    decode,
    use: Usage.GENERAL
  },
  41: {
    name: 'DPT_Value_Luminance',
    encode,
    decode,
    use: Usage.GENERAL
  },
  42: {
    name: 'DPT_Value_Luminous_Flux',
    encode,
    decode,
    use: Usage.GENERAL
  },
  43: {
    name: 'DPT_Value_Luminous_Intensity',
    encode,
    decode,
    use: Usage.GENERAL
  },
  44: {
    name: 'DPT_Value_Magnetic_FieldStrength',
    encode,
    decode,
    use: Usage.GENERAL
  },
  45: {
    name: 'DPT_Value_Magnetic_Flux',
    encode,
    decode,
    use: Usage.GENERAL
  },
  46: {
    name: 'DPT_Value_Magnetic_FluxDensity',
    encode,
    decode,
    use: Usage.GENERAL
  },
  47: {
    name: 'DPT_Value_Magnetic_Moment',
    encode,
    decode,
    use: Usage.GENERAL
  },
  48: {
    name: 'DPT_Value_Magnetic_Polarization',
    encode,
    decode,
    use: Usage.GENERAL
  },
  49: {
    name: 'DPT_Value_Magnetization',
    encode,
    decode,
    use: Usage.GENERAL
  },
  50: {
    name: 'DPT_Value_MagnetomotiveForce',
    encode,
    decode,
    use: Usage.GENERAL
  },
  51: {
    name: 'DPT_Value_Mass',
    encode,
    decode,
    use: Usage.GENERAL
  },
  52: {
    name: 'DPT_Value_MassFlux',
    encode,
    decode,
    use: Usage.GENERAL
  },
  53: {
    name: 'DPT_Value_Momentum',
    encode,
    decode,
    use: Usage.GENERAL
  },
  54: {
    name: 'DPT_Value_Phase_AngleRad',
    encode,
    decode,
    use: Usage.GENERAL
  },
  55: {
    name: 'DPT_Value_Phase_AngleDeg',
    encode,
    decode,
    use: Usage.GENERAL
  },
  56: {
    name: 'DPT_Value_Power',
    encode,
    decode,
    use: Usage.GENERAL
  },
  57: {
    name: 'DPT_Value_Power_Factor',
    encode,
    decode,
    use: Usage.GENERAL
  },
  58: {
    name: 'DPT_Value_Pressure',
    encode,
    decode,
    use: Usage.GENERAL
  },
  59: {
    name: 'DPT_Value_Reactance',
    encode,
    decode,
    use: Usage.GENERAL
  },
  60: {
    name: 'DPT_Value_Resistance',
    encode,
    decode,
    use: Usage.GENERAL
  },
  61: {
    name: 'DPT_Value_Resistivity',
    encode,
    decode,
    use: Usage.GENERAL
  },
  62: {
    name: 'DPT_Value_SelfInductance',
    encode,
    decode,
    use: Usage.GENERAL
  },
  63: {
    name: 'DPT_Value_SolidAngle',
    encode,
    decode,
    use: Usage.GENERAL
  },
  64: {
    name: 'DPT_Value_Sound_Intensity',
    encode,
    decode,
    use: Usage.GENERAL
  },
  65: {
    name: 'DPT_Value_Speed',
    encode,
    decode,
    use: Usage.GENERAL
  },
  66: {
    name: 'DPT_Value_Stress',
    encode,
    decode,
    use: Usage.GENERAL
  },
  67: {
    name: 'DPT_Value_Surface_Tension',
    encode,
    decode,
    use: Usage.GENERAL
  },
  68: {
    name: 'DPT_Value_Common_Temperature',
    encode,
    decode,
    use: Usage.GENERAL
  },
  69: {
    name: 'DPT_Value_Absolute_Temperature',
    encode,
    decode,
    use: Usage.GENERAL
  },
  70: {
    name: 'DPT_Value_TemperatureDifference',
    encode,
    decode,
    use: Usage.GENERAL
  },
  71: {
    name: 'DPT_Value_Thermal_Capacity',
    encode,
    decode,
    use: Usage.GENERAL
  },
  72: {
    name: 'DPT_Value_Thermal_Conductivity',
    encode,
    decode,
    use: Usage.GENERAL
  },
  73: {
    name: 'DPT_Value_ThermoelectricPower',
    encode,
    decode,
    use: Usage.GENERAL
  },
  74: {
    name: 'DPT_Value_Time',
    encode,
    decode,
    use: Usage.GENERAL
  },
  75: {
    name: 'DPT_Value_Torque',
    encode,
    decode,
    use: Usage.GENERAL
  },
  76: {
    name: 'DPT_Value_Volume',
    encode,
    decode,
    use: Usage.GENERAL
  },
  77: {
    name: 'DPT_Value_Volume_Flux',
    encode,
    decode,
    use: Usage.GENERAL
  },
  78: {
    name: 'DPT_Value_Weight',
    encode,
    decode,
    use: Usage.GENERAL
  },
  79: {
    name: 'DPT_Value_Work',
    encode,
    decode,
    use: Usage.GENERAL
  }
}
