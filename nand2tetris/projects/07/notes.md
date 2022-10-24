# Notes for Unit 7

## Machine Language Primer

### How it works

The von Neumann Architecture which builds on the Universal Turing Machine specifies
a CPU and a Memory Hierarchy.

The CPU implements operations and based on the complexity of the architecture they specify what kind of logic and arithmetic operations are possible.

Register -> Cache -> Main Memory (RAM) -> Disk

Registers: Reside on the CPU and their functionality is part of the op-codes for the cpu
Data Registers: Just store values for the next operation
Address Registers: Store an address to the main memory

I/O
Devices: Keyboard, Mouse, Camera
CPU needs some kind of protocol to talk to them: Drivers
Devices are connected to the cpu through dedicated memory addresses which map on the main address

Flow control

unconditional Jump: Jump to an address or a symbol indicating an address (to loop)
conditional jump: Jump based on a condition to create a decision

### Components of Hack

Hardware design and machine language design go hand in hand.
16-bit computer which means that the smallest unit of information is in chunks of 16 bits
Data Memory (RAM): A sequence of 16-bit registers: RAM[0], RAM[1]...
Instruction Memory
Central Processing Unit
Instruction Bus

Hack Program is a sequence of
16-bit A-Instructions or
16-bit C-Instructions

Program is loaded into the ROM -> Reset -> Program starts running

D (register): Holds a 16-bit value
A (register): Holds a 16-bit value or address
M (register): Represents a 16-bit RAM register addressed by A

A-Instruction

@value (a non-negative decimal constant or a symbol reffering to such a constant)

C-Instruction

dest = comp ; jump (we compute something specifying registers, we can store them in a registers and then optionally jump aftewards)

dest = null, M, D, MD, A, AM, AD, AMD (a combination of destinations is possible to store a value in multiple locations)
comp = 0, 1, -1, D, A, !D, !A, -D, -A, D+1, A+1, D-1, A-1, D+A, D-A, A-D, D&A, D|A, M, !M, -M, M+1, M-1, D+M, D-M, M-D, D&M, D|M (The arithmetic and logic operations available and implemented by the CPU Hardware)
jump = null, JGT, JEQ, JGE, JLT, JNE, JLE, JMP (the conditional jump compare the result of comp with 0)
0; JMP (is an unconditional jump)

a jump instruction jumps to the address specified by the A register.

Symbolic <-> Binary

Use an assembler to translate the symbolic assembly language to binary

### Low-Level Programming

