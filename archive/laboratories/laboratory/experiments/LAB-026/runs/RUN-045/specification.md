# AetherProtocol

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:47.027851Z
**Run ID**: RUN-045
**Seed**: 1700000045

---

## Architecture

- Architecture: hierarchical
- Node Type: uniform
- Quorum Type: majority

## Leader Election

- Method: term_based
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: majority_quorum
- Vote Granting: grant_to_highest_term
- Vote Revocations: False

## Log Replication

- Type: command_log
- Structure: linked_list
- Commit Method: majority_commit

## Recovery

- Strategy: hybrid_recovery
- Snapshot Policy: adaptive

## Membership

- Model: static
- Add Node: 
- Remove Node: 

## Failure Handling

- Detection: adaptive
- Model: omission

## Timing

- Timeout Model: exponential
- Heartbeat Interval: 396ms
- Election Timeout Base: 471ms
- Election Timeout Range: 178ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- leader_announce
- term_update

## State Machine

- Type: deterministic
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:term_based
- concept:term_epochs
- concept:randomized_timeout
- voting:majority_quorum
- vote_granting:grant_to_highest_term
- concept:majority_quorum
- log:command_log
- log_structure:linked_list
- commit:majority_commit
- recovery:hybrid_recovery
- snapshot:adaptive
- failure_detection:adaptive

---

## Simulation Results

### 3 Nodes

- Election Attempts: 60
- Elections Succeeded: 44
- Election Success Rate: 73.33%
- Messages Sent: 172
- Commits: 18
- Avg Messages/Commit: 9.56
- Leader Changes: 44
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 55
- Elections Succeeded: 47
- Election Success Rate: 85.45%
- Messages Sent: 246
- Commits: 24
- Avg Messages/Commit: 10.25
- Leader Changes: 47
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 49
- Elections Succeeded: 44
- Election Success Rate: 89.80%
- Messages Sent: 387
- Commits: 21
- Avg Messages/Commit: 18.43
- Leader Changes: 44
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 63
- Elections Succeeded: 58
- Election Success Rate: 92.06%
- Messages Sent: 458
- Commits: 21
- Avg Messages/Commit: 21.81
- Leader Changes: 58
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

