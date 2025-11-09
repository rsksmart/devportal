## zk proofs

### Demo dapp

#### Requirements
- node
- rust

INFO
Noir does not support native installation on windows.
Windows users should use WSL

[Nargo](https://noir-lang.org/docs/getting_started/quick_start#nargo) is a command line tool used to create, compile, execute and test Noir projects.
Open yout terminal and use the command below to download and execute the `noirup` script

```bash
curl -L https://raw.githubusercontent.com/noir-lang/noirup/refs/heads/main/install | bash
```

Run `noirup` to install and update Nargo
```bash
noirup
```

```bash
$ noirup
noirup: installing nargo (latest stable)
noirup: downloading latest Noir binaries to '/home/mash/.nargo/bin'
################################################################################### 100.0%
noirup: done
```

Create a new folder `zk_demo` and initialize a `package.json` with npm.

```bash
$ mkdir zk_demo
$ npm init -y
```

Create a new folder `circuits`, `cd` into it, run
```bash
nargo new verifier
```

```bash
$ nargo new verifier
Project successfully created! It is located at /home/mash/Desktop/zk_demo/circuits/verifier
```

//CREATES THIS FOLDER STRUCTURE
```bash
verifier/
├── src/
│   └── main.nr          # Main circuit file
├── Nargo.toml
└── Prover.toml          # Input values
```

Edit `Nargo.toml`
```bash
[package]
name = "verifier"
type = "bin"
authors = [""]

[dependencies]
```

Still in the verifier root folder, create another file `Prover.toml`. This contains the actual values used when generating a proof.
```bash
secret_code = "54321"
expected_hash = "0x033ee39a20a79181e7ff2e8fc9fe1192200294469d9528a7f093d8d788d43df4"
```

Go to `src/main.nr` and edit is as follows
```rust
fn main(
    // Public inputs (visible to everyone)
    expected_hash: pub Field,
    // Private inputs (known only to prover)
    secret_code: Field,
) {
    // Compute the hash of the secret code
    let computed_hash = std::hash::pedersen_hash([secret_code]);

    // print values to confirm the hash
    std::println(secret_code); // will be converted to hex 
    std::println(expected_hash);
    std::println(computed_hash);

    // Assert that the computed hash matches the expected hash
    assert(computed_hash == expected_hash);
}
```

Compile your Noir code into a constraint system that can be used to generate proofs. In case of errors in your code, this step will fail. 
```bash
nargo compile
```
After compilation, you will see a new folder `target`, inside it will be a json file `zk_demo.json`.<br></br>
The json file contains circuit constraints, ABI and metadata about public and private inputs.

Execute the circuit using the values in `Prover.toml`. 
```bash
nargo execute witness
```
The witness is the resulting output of a successful execution, stored in `target` folder as `witness.gz`(gzip compressed).

```bash
$ nargo execute witness

0xd431
0x033ee39a20a79181e7ff2e8fc9fe1192200294469d9528a7f093d8d788d43df4
0x033ee39a20a79181e7ff2e8fc9fe1192200294469d9528a7f093d8d788d43df4
[verifier] Circuit witness successfully solved
[verifier] Witness saved to target/verifier.gz
```


#### Generate the verifier smart contract
Install [Barretenberg](https://barretenberg.aztec.network/docs/getting_started)<br></br>
Use the script below to install and update Barretenberg's CLI tool
```bash
curl -L https://raw.githubusercontent.com/AztecProtocol/aztec-packages/refs/heads/next/barretenberg/bbup/install | bash
```


























































