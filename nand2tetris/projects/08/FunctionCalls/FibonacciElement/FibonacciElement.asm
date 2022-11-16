@256
D=A
@SP
M=D
NOT IMPLEMENTED YET
// function Main.fibonacci 0
NOT IMPLEMENTED YET,// push argument 0
@ARG
A=M
D=A
@0
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1,// push constant 2
@2
D=A
@SP
A=M
M=D
@SP
M=M+1,// lt                     
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
D=M-D
@Main.LT.3
D;JLT
@SP
A=M
M=0
@Main.LT.3.End
0;JMP
(Main.LT.3)
@SP
A=M
M=-1
(Main.LT.3.End)
@SP
M=M+1,// if-goto IF_TRUE
NOT IMPLEMENTED YET,// goto IF_FALSE
NOT IMPLEMENTED YET,// label IF_TRUE          
NOT IMPLEMENTED YET,// push argument 0        
@ARG
A=M
D=A
@0
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1,// return
NOT IMPLEMENTED YET,// label IF_FALSE         
NOT IMPLEMENTED YET,// push argument 0
@ARG
A=M
D=A
@0
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1,// push constant 2
@2
D=A
@SP
A=M
M=D
@SP
M=M+1,// sub
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
M=M-D
@SP
M=M+1,// call Main.fibonacci 1  
NOT IMPLEMENTED YET,// push argument 0
@ARG
A=M
D=A
@0
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1,// push constant 1
@1
D=A
@SP
A=M
M=D
@SP
M=M+1,// sub
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
M=M-D
@SP
M=M+1,// call Main.fibonacci 1  
NOT IMPLEMENTED YET,// add                    
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
M=M+D
@SP
M=M+1,// return
NOT IMPLEMENTED YET
// function Sys.init 0
NOT IMPLEMENTED YET,// push constant 4
@4
D=A
@SP
A=M
M=D
@SP
M=M+1,// call Main.fibonacci 1   
NOT IMPLEMENTED YET,// label WHILE
NOT IMPLEMENTED YET,// goto WHILE              
NOT IMPLEMENTED YET